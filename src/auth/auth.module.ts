import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ContractModules } from 'src/contracts/contract.module';
import { AuthController } from './controllers/auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AppConfigModule } from 'src/config/config.module';

console.log('process.env.JWT_SECRET');
console.log(process.env.JWT_SECRET);

const jwtModule = JwtModule.register({
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: '600s',
  },
});

@Module({
  controllers: [AuthController],
  imports: [AppConfigModule, ContractModules, PassportModule, jwtModule],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
