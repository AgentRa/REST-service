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

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    const responseWithout = this.usersService.create(createUserDto);
    delete responseWithout['password'];
    return responseWithout;
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const user = this.usersService.findOne(id);
    if (!user) throw new UserDoesNotExistException();

    return user;
  }

  @Put(':id')
  @HttpCode(200)
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const user = this.usersService.findOne(id);
    if (!user) throw new UserDoesNotExistException();

    if (user.password !== updatePasswordDto.oldPassword)
      throw new WrongOldPasswordExeption();

    const record = {
      ...user,
      password: updatePasswordDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    const responseWithout = this.usersService.update(record);
    delete responseWithout['password'];
    return responseWithout;

    // TODO: make util for that
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const user = this.usersService.findOne(id);
    if (!user) throw new UserDoesNotExistException();

    this.usersService.remove(id);
  }
}
