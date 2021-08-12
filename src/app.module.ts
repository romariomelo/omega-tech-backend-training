import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/config.module';
import { ContractModules } from './contracts/contract.module';
import { DatabaseModule } from './database/databse.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, AuthModule, ContractModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
