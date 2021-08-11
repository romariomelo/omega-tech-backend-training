import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proposal } from 'src/contracts/entities/proposal.entity';
import { User } from 'src/contracts/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'postgres',
      synchronize: true,
      host: 'localhost',
      schema: 'public',
      entities: [User, Proposal],
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
