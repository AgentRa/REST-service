import { HttpException } from '@nestjs/common';

export class UserDoesNotExistException extends HttpException {
  constructor() {
    super(
      {
        message: 'User does not exist',
        error: 'Does not exist in database',
        statusCode: 404,
      },
      404,
    );
  }
}

export class InvalidUUIDExeption extends HttpException {
  constructor() {
    super(
      {
        message: 'Invalid UUID',
        error: 'Invalid UUID',
        statusCode: 400,
      },
      400,
    );
  }
}

export class WrongOldPasswordExeption extends HttpException {
  constructor() {
    super(
      {
        message: 'Old password is wrong',
        error: 'Old password is wrong',
        statusCode: 403,
      },
      403,
    );
  }
}
