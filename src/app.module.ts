import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContractModules } from './contracts/contract.module';
import { DatabaseModule } from './database/databse.module';

@Module({
  imports: [DatabaseModule, ContractModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
