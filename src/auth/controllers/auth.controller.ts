import { Post, UseGuards, Request, Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { LocalAuthGuard } from '../local-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Body() body) {
    console.log('AuthController.login');
    body.access_token = 'aaaaaaaaaaaaaaaaa';
    return body; // DEVE RETORNA O TOKEN JWT ou BASIC
  }
}
