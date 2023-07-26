import { Injectable } from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService extends InMemoryDBService<UserEntity> {
  create({ login, password }: CreateUserDto): UserEntity {
    return {
      ...super.create({
        id: uuidv4(),
        login,
        password,
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }),
    };
  }

  isExist(login: string): UserEntity | undefined {
    return super.getAll().find((user) => user.login === login);
  }

  findAll() {
    return super.getAll();
  }

  findOne(id: string) {
    return super.get(id);
  }

  update(record: UserEntity): UserEntity {
    super.update(record);
    return record;
  }

  remove(id: string) {
    super.delete(id);
  }
}
