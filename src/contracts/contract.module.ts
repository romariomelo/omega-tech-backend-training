import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/contracts/controllers/user.controller';
import { UserService } from 'src/contracts/services/user.service';
import { Proposal } from './entities/proposal.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Proposal])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class ContractModules {}
