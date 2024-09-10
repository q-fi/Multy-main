import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayloadDto } from './dto/auth.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Observable, map } from 'rxjs';

type Token = {
  token:string
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 200, description: 'Login successful' })
  login(@Body() authPayload: AuthPayloadDto): Observable<Token> {
    return this.authService.login(authPayload).pipe(map(token => ({ token })));
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'Registration successful' })
  register(@Body() authPayload: AuthPayloadDto): Observable<Token> {
    return this.authService.registration(authPayload).pipe(map(token => ({ token })));
  }
}
