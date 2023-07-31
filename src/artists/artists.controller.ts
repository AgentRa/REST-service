import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { validate } from 'uuid';
import { InvalidUUIDExeption } from '../users/errors';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { plainToClass } from 'class-transformer';
import { FavoriteEntity } from '../favorites/entities/favorite.entity';

@Controller('artist')
export class ArtistsController {
  constructor(
    private readonly artistsService: ArtistsService,
    @Inject('DATABASE') private favorites: FavoriteEntity,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createArtistDto: CreateArtistDto) {
    const record = plainToClass(ArtistEntity, createArtistDto);
    return this.artistsService.create(record);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const artist = this.artistsService.findOne(id);
    if (!artist) throw new HttpException('Artist does not exist', 404);

    return artist;
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const artist = this.artistsService.findOne(id);
    if (!artist) throw new HttpException('Artist does not exist', 404);

    const record: ArtistEntity = {
      id: artist.id,
      name: updateArtistDto?.name || artist.name,
      grammy: updateArtistDto?.grammy ?? artist.grammy,
    };

    return this.artistsService.update(record);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const artist = this.artistsService.findOne(id);
    if (!artist) throw new HttpException('Artist does not exist', 404);
    //TODO dublicate of code

    const index = this.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );
    this.favorites.artists.splice(index, 1);

    this.artistsService.remove(id);
  }
}
