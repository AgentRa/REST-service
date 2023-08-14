import { UpdatePasswordDto } from '../dto/update-user-password.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';

@Entity()
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4
  @ApiProperty()
  @Column()
  login: string;
  @ApiProperty()
  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;
  @ApiProperty()
  @Column('smallint')
  version = 1; // integer number, increments on update
  @ApiProperty()
  @CreateDateColumn()
  @Transform(({ value }) => value.getTime())
  createdAt: Date; // timestamp of creation
  @ApiProperty()
  @CreateDateColumn()
  @Transform(({ value }) => value.getTime())
  updatedAt: Date; // timestamp of last update

  constructor(data: Partial<UserEntity>) {
    this.id = data?.id;
    this.login = data?.login;
    this.password = data?.password;
    this.createdAt = data?.createdAt;
    this.updatedAt = data?.updatedAt;
  }

  updatePassword(updatePasswordDto: UpdatePasswordDto) {
    this.password = updatePasswordDto.newPassword;
    this.version += 1;
    this.createdAt = new Date(this.createdAt);
    this.updatedAt = new Date();

    return this;
  }
}
