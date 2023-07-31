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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { validate } from 'uuid';
import { InvalidUUIDExeption } from '../users/errors';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { plainToClass } from 'class-transformer';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Create a new artist',
    description: 'Create a new artist with the provided artist data.',
  })
  @ApiBody({ type: CreateArtistDto })
  @ApiCreatedResponse({
    description: 'Successfully added the artist to the collection',
    type: ArtistEntity,
  })
  create(@Body() createArtistDto: CreateArtistDto) {
    const record = plainToClass(ArtistEntity, createArtistDto);
    return this.artistsService.create(record);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all artists',
    description: 'Retrieve a list of all artists from the collection.',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved all artists',
    type: [ArtistEntity],
  })
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get artist by ID',
    description: 'Retrieve an artist from the collection by its unique ID.',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved the artist by ID',
    type: ArtistEntity,
  })
  @ApiNotFoundResponse({
    description: 'Artist with the provided ID does not exist',
  })
  @ApiBadRequestResponse({
    description: 'Invalid UUID provided',
  })
  findOne(@Param('id') id: string) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const artist = this.artistsService.findBy(id);
    if (!artist) throw new HttpException('Artist does not exist', 404);

    return artist;
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update artist by ID',
    description: 'Update an artist in the collection by its unique ID.',
  })
  @ApiBody({ type: UpdateArtistDto })
  @ApiOkResponse({
    description: 'Successfully updated the artist by ID',
    type: ArtistEntity,
  })
  @ApiNotFoundResponse({
    description: 'Artist with the provided ID does not exist',
  })
  @ApiBadRequestResponse({
    description: 'Invalid UUID provided',
  })
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const artist = this.artistsService.findBy(id);
    if (!artist) throw new HttpException('Artist does not exist', 404);

    const record: ArtistEntity = {
      id: artist.id,
      name: updateArtistDto?.name ?? artist.name,
      grammy: updateArtistDto?.grammy ?? artist.grammy,
    };

    return this.artistsService.update(record);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete artist by ID',
    description: 'Delete an artist from the collection by its unique ID.',
  })
  @ApiOkResponse({
    description: 'Successfully deleted the artist by ID',
  })
  @ApiNotFoundResponse({
    description: 'Artist with the provided ID does not exist',
  })
  @ApiBadRequestResponse({
    description: 'Invalid UUID provided',
  })
  remove(@Param('id') id: string) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const artist = this.artistsService.findBy(id);
    if (!artist) throw new HttpException('Artist does not exist', 404);

    this.artistsService.remove(id);
  }
}
