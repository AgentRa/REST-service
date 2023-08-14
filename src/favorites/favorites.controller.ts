import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { validate } from 'uuid';
import { InvalidUUIDExeption } from '../users/errors';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Retrieve a list of all favorite items.',
  })
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('/:type/:id')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Add to favorites',
    description: 'Add an item to the favorites list based on its type and ID.',
  })
  @ApiCreatedResponse({
    description: 'Successfully added to the favorites list',
  })
  @ApiNotFoundResponse({
    description: 'The item with the provided ID and type does not exist',
  })
  @ApiBadRequestResponse({
    description: 'Invalid UUID provided',
  })
  addToFavorites(
    @Param('type') type: 'artist' | 'album' | 'track',
    @Param('id') id: string,
  ) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const item = this.favoritesService.findOneByType(type, id);

    if (!item) throw new HttpException(`This ${type} does not exist`, 422);

    this.favoritesService.addToFavorites(type, item);
  }

  @Delete('/:type/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Remove from favorites',
    description:
      'Remove an item from the favorites list based on its type and ID.',
  })
  @ApiResponse({
    status: 204,
    description: 'Successfully removed the item from the favorites list',
  })
  @ApiNotFoundResponse({
    description: 'The item with the provided ID and type is not in favorites',
  })
  @ApiBadRequestResponse({
    description: 'Invalid UUID provided',
  })
  removeFromFavorites(
    @Param('type') type: 'artist' | 'album' | 'track',
    @Param('id') id: string,
  ) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const success = this.favoritesService.removeFromFavorites(type, id);

    if (!success) throw new HttpException(`This ${type} is not favorite`, 404);
  }
}
