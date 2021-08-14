import { Injectable } from '@nestjs/common';
import { UserService } from 'src/contracts/services/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userEmail: string, userPass: string): Promise<any> {
    const user = await this.userService.findByEmail(userEmail);
    const { ...result } = user;

    if (!user) throw new Error('User not found');
    const isPasswordValid = await bcrypt.compare(userPass, user.getPassword);
    if (isPasswordValid) {
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.publicId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
