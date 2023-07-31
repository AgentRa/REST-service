import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  InvalidUUIDExeption,
  UserDoesNotExistException,
  WrongOldPasswordExeption,
} from './errors';
import { validate } from 'uuid';
import { UpdatePasswordDto } from './dto/update-user-password.dto';
import { plainToClass } from 'class-transformer';
import { UserEntity } from './entities/user.entity';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Create a new user with the provided user data.',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: UserEntity,
  })
  create(@Body() createUserDto: CreateUserDto) {
    const record = plainToClass(UserEntity, createUserDto);
    return this.usersService.create(record);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all users.',
  })
  @ApiOkResponse({
    description: 'A users has been successfully fetched',
    type: UserEntity,
  })
  @HttpCode(200)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get a user by id',
    description: 'Get a user by id.',
  })
  @ApiOkResponse({
    description: 'A user has been successfully fetched',
    type: UserEntity,
  })
  findBy(@Param('id') id: string) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const user = this.usersService.findBy(id);
    if (!user) throw new UserDoesNotExistException();

    return user;
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Password update',
    description: 'Updates user password.',
  })
  @ApiBody({ type: UpdatePasswordDto })
  @ApiOkResponse({
    description: 'A user has been successfully updated',
    type: UserEntity,
  })
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const user = this.usersService.findBy(id);
    if (!user) throw new UserDoesNotExistException();

    if (user.password !== updatePasswordDto.oldPassword)
      throw new WrongOldPasswordExeption();

    const updatedUser = plainToClass(UserEntity, user).updatePassword(
      updatePasswordDto,
    );

    return this.usersService.update(updatedUser);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete a user by id',
    description: 'Delete a user by id.',
  })
  @ApiOkResponse({
    description: 'A user has been successfully deleted',
    type: UserEntity,
  })
  remove(@Param('id') id: string) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const user = this.usersService.findBy(id);
    if (!user) throw new UserDoesNotExistException();

    this.usersService.remove(id);
  }
}
