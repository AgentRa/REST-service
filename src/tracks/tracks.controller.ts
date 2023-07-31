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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { validate } from 'uuid';
import { InvalidUUIDExeption } from '../users/errors';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { plainToClass } from 'class-transformer';
import { FavoriteEntity } from '../favorites/entities/favorite.entity';

@Controller('track')
export class TracksController {
  constructor(
    private readonly tracksService: TracksService,
    @Inject('DATABASE') private favorites: FavoriteEntity,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createTrackDto: CreateTrackDto) {
    const record = plainToClass(TrackEntity, createTrackDto);
    return this.tracksService.create(record);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const track = this.tracksService.findOne(id);
    if (!track) throw new HttpException('Track does not exist', 404);

    return track;
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const track = this.tracksService.findOne(id);
    if (!track) throw new HttpException('Track does not exist', 404);

    const record: TrackEntity = {
      id: track.id,
      name: updateTrackDto?.name || track.name,
      artistId: updateTrackDto?.artistId ?? track.artistId,
      albumId: updateTrackDto?.albumId ?? track.albumId,
      duration: updateTrackDto?.duration || track.duration,
    };

    return this.tracksService.update(record);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const track = this.tracksService.findOne(id);
    if (!track) throw new HttpException('Track does not exist', 404);

    const index = this.favorites.tracks.findIndex((artist) => artist.id === id);
    this.favorites.tracks.splice(index, 1);

    return this.tracksService.remove(id);
  }
}
