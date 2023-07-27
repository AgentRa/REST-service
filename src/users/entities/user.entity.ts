import { UpdatePasswordDto } from '../dto/update-user-password.dto';

export class UserEntity {
  id: string; // uuid v4
  login: string;
  password: string;
  version = 1; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
    if (!this.createdAt) {
      this.createdAt = new Date().getTime();
      this.updatedAt = this.createdAt;
    }
    this.updatedAt = new Date().getTime();
  }

  updatePassword(updatePasswordDto: UpdatePasswordDto) {
    this.password = updatePasswordDto.newPassword;
    this.version += 1;
    this.updatedAt = new Date().getTime();

    return this;
  }
}
