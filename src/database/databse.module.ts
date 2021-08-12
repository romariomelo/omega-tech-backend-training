import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: Boolean(process.env.DB_SYNCHRONIZE),
      host: process.env.DB_HOST,
      schema: process.env.DB_SCHEMA,
      entities: [__dirname + '/../**/*.entity.js'],
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
