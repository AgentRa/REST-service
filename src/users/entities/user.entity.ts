import { UpdatePasswordDto } from '../dto/update-user-password.dto';
import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty()
  id: string; // uuid v4
  login: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  version = 1; // integer number, increments on update
  @ApiProperty()
  createdAt: number; // timestamp of creation
  @ApiProperty()
  updatedAt: number; // timestamp of last update

  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
    if (!this.createdAt) {
      this.createdAt = new Date().getTime();
      this.updatedAt = this.createdAt;
    }
    this.updatedAt = new Date().getTime();
    this.id = uuidv4();
  }

  updatePassword(updatePasswordDto: UpdatePasswordDto) {
    this.password = updatePasswordDto.newPassword;
    this.version += 1;
    this.updatedAt = new Date().getTime();

    return this;
  }
}
