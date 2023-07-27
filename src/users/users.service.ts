import { Injectable } from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService extends InMemoryDBService<UserEntity> {
  create(record: UserEntity): UserEntity {
    return super.create(record);
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
