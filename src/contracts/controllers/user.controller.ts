import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/contracts/services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { Guid } from 'guid-typescript';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';

const GEN_SALT = 2; // QUANTIDADE SALTOS DA CRIPOGRAFIA (BCRYPT)

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Get(':id')
  async findByPublicId(@Param() param) {
    const { id } = param;
    const user = await this.userService.findByPublicId(id);
    if (!user) throw new NotFoundException(`User of id '${id}' not found.`);
    return user;
  }

  @Get('findByEmail/:email')
  async findByEmail(@Param() param) {
    const { email } = param;
    return this.userService.findByEmail(email);
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
