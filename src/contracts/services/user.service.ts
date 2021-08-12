import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.usersRepository.find();
  }

  async findByPublicId(publicId): Promise<User> {
    return this.usersRepository.findOne({ where: [{ publicId }] });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: [{ email }] });
  }

  create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
}
