import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ContractModules } from 'src/contracts/contract.module';
import { AuthController } from './controllers/auth.controller';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './services/auth.service';

@Module({
  controllers: [AuthController],
  imports: [ContractModules, PassportModule],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
