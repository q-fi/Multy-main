import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getToken(): string | null {
    const cookieName = 'authToken';
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${cookieName}=`));

    if (cookieValue) {
      return cookieValue.split('=')[1];
    }

    return null;
  }

  decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      if (
        decodedToken &&
        decodedToken.exp &&
        !decodedToken.isBanned &&
        decodedToken.isActivated
      ) {
        const expirationDate = new Date(0);
        expirationDate.setUTCSeconds(decodedToken.exp);
        return expirationDate > new Date();
      }
    }
    return false;
  }
}
