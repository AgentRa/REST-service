import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  create(record: UserEntity): UserEntity {
    const responseWithout = { ...this.databaseService.users.create(record) };
    delete responseWithout['password'];
    return responseWithout;
  }

  findAll() {
    return this.databaseService.users.findAll();
  }

  findBy(id: string) {
    return this.databaseService.users.findBy(id);
  }

  update(record: UserEntity): UserEntity {
    const responseWithout = { ...this.databaseService.users.update(record) };
    delete responseWithout['password'];
    return responseWithout;
  }

  remove(id: string) {
    this.databaseService.users.remove(id);
  }
}
