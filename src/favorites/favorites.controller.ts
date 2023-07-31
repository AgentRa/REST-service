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

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('/:type/:id')
  @HttpCode(201)
  addToFavorites(
    @Param('type') type: 'artist' | 'album' | 'track',
    @Param('id') id: string,
  ) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const track =
      type === 'track' && this.favoritesService.findOneByType(type, id);
    const album =
      type === 'album' && this.favoritesService.findOneByType(type, id);
    const artist =
      type === 'artist' && this.favoritesService.findOneByType(type, id);

    const record = track || album || artist;

    if (!track && !album && !artist)
      throw new HttpException(`This ${type} does not exist`, 422);

    this.favoritesService.addToFavorites(type, record);
  }

  @Delete('/:type/:id')
  @HttpCode(204)
  removeFromFavorites(
    @Param('type') type: 'artist' | 'album' | 'track',
    @Param('id') id: string,
  ) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const success = this.favoritesService.removeFromFavorites(type, id);

    if (!success) throw new HttpException(`This ${type} is not favorite`, 404);
  }
}
