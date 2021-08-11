import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserService } from 'src/contracts/services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { Guid } from 'guid-typescript';
import { Response } from 'express';

const GEN_SALT = 2; // QUANTIDADE SALTOS DA CRIPOGRAFIA (BCRYPT)

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }
  @Post()
  async add(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      GEN_SALT,
    );
    const user = new User(
      Guid.create().toString(),
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
    );
    this.userService
      .create(user)
      .then((result) => {
        response
          .status(201)
          .json({ message: 'Created succesfully', user: { ...result } });
      })
      .catch((error) => {
        response.status(400).json({ message: error.message });
      });
  }
}
