import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { DatabaseService } from '../database/database.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { classToPlain } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    private databaseService: DatabaseService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }

  async findBy(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(record: UserEntity) {
    const newUser = this.userRepository.create(record);
    const savedUser = this.userRepository.save(newUser);
    return classToPlain(savedUser);
  }

  async update(record: UserEntity) {
    await this.userRepository.update(record.id, record);
    return this.userRepository.findOne({ where: { id: record.id } });
    // const responseWithout = { ...this.databaseService.users.update(record) };
    // delete responseWithout['password'];
    // return responseWithout;
  }

  async remove(id: string) {
    await this.userRepository.delete(id);
    // this.databaseService.users.remove(id);
  }
}
