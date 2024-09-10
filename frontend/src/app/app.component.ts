import { Component, ViewChild } from '@angular/core';
import {
  NavigationStart,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterOutlet,
    MatIcon,
    MatSidenavModule,
    MatNavList,
    MatToolbar,
    RouterLink,
    CommonModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthGuard,
    AuthService,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isPublicRoute: boolean = false;

  constructor(private router: Router, private cookieService: CookieService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isPublicRoute =
          event.url === '/login' || event.url === '/register';
      }
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  closeSidenav() {
    this.sidenav.close();
  }

  logout() {
    this.cookieService.delete('authToken');
    this.router.navigate(['/login']);
  }
}
