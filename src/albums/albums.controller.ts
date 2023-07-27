import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { validate } from 'uuid';
import { InvalidUUIDExeption } from '../users/errors';
import { AlbumEntity } from './entities/album.entity';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const album = this.albumsService.findOne(id);
    if (!album) throw new HttpException('Album does not exist', 404);

    return album;
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const album = this.albumsService.findOne(id);
    if (!album) throw new HttpException('Album does not exist', 404);

    const record: AlbumEntity = {
      id: album.id,
      name: updateAlbumDto?.name || album.name,
      year: updateAlbumDto?.year || album.year,
      artistId: updateAlbumDto?.artistId ?? album.artistId,
    };

    return this.albumsService.update(record);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const album = this.albumsService.findOne(id);
    if (!album) throw new HttpException('Album does not exist', 404);

    return this.albumsService.remove(id);
  }
}
