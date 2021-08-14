import { Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { LocalAuthGuard } from '../strategies/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../strategies/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Body() body) {
    return this.authService.login(req.user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me() {
    return { message: 'Is Me' };
  }
}
