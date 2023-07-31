import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { validate } from 'uuid';
import { InvalidUUIDExeption } from '../users/errors';
import { FavoriteEntity } from './entities/favorite.entity';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    @Inject('DATABASE') private favorites: FavoriteEntity,
  ) {}

  @Get()
  @HttpCode(200)
  findAll() {
    return this.favorites;
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

    let index = -1;

    switch (type) {
      case 'artist':
        index = this.favorites.artists.findIndex((artist) => artist.id === id);
        this.favorites.artists.splice(index, 1);
        break;
      case 'album':
        index = this.favorites.albums.findIndex((album) => album.id === id);
        this.favorites.albums.splice(index, 1);
        break;
      case 'track':
        index = this.favorites.tracks.findIndex((track) => track.id === id);
        this.favorites.tracks.splice(index, 1);
        break;
    }

    if (index === -1)
      throw new HttpException(`This ${type} is not favorite`, 404);
  }
}
