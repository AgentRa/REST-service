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
import { plainToClass } from 'class-transformer';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Create a new album',
    description: 'Create a new album with the provided album data.',
  })
  @ApiBody({ type: CreateAlbumDto })
  @ApiCreatedResponse({
    description: 'Successfully added the album to the collection',
    type: AlbumEntity,
  })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    const record = plainToClass(AlbumEntity, createAlbumDto);
    return this.albumsService.create(record);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all albums',
    description: 'Retrieve a list of all albums from the collection.',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved all albums',
    type: [AlbumEntity],
  })
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get album by ID',
    description: 'Retrieve an album from the collection by its unique ID.',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved the album by ID',
    type: AlbumEntity,
  })
  @ApiNotFoundResponse({
    description: 'Album with the provided ID does not exist',
  })
  @ApiBadRequestResponse({
    description: 'Invalid UUID provided',
  })
  findOne(@Param('id') id: string) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const album = this.albumsService.findBy(id);
    if (!album) throw new HttpException('Album does not exist', 404);

    return album;
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update album by ID',
    description: 'Update an album in the collection by its unique ID.',
  })
  @ApiBody({ type: UpdateAlbumDto })
  @ApiOkResponse({
    description: 'Successfully updated the album by ID',
    type: AlbumEntity,
  })
  @ApiNotFoundResponse({
    description: 'Album with the provided ID does not exist',
  })
  @ApiBadRequestResponse({
    description: 'Invalid UUID provided',
  })
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const album = this.albumsService.findBy(id);
    if (!album) throw new HttpException('Album does not exist', 404);

    const record: AlbumEntity = {
      id: album.id,
      name: updateAlbumDto?.name ?? album.name,
      year: updateAlbumDto?.year ?? album.year,
      artistId: updateAlbumDto?.artistId ?? album.artistId,
    };

    return this.albumsService.update(record);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete album by ID',
    description: 'Delete an album from the collection by its unique ID.',
  })
  @ApiOkResponse({
    description: 'Successfully deleted the album by ID',
  })
  @ApiNotFoundResponse({
    description: 'Album with the provided ID does not exist',
  })
  @ApiBadRequestResponse({
    description: 'Invalid UUID provided',
  })
  remove(@Param('id') id: string) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const album = this.albumsService.findBy(id);
    if (!album) throw new HttpException('Album does not exist', 404);

    return this.albumsService.remove(id);
  }
}
