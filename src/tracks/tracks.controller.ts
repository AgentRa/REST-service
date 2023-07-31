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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { validate } from 'uuid';
import { InvalidUUIDExeption } from '../users/errors';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { plainToClass } from 'class-transformer';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Create a new track',
    description: 'Create a new track with the provided track data.',
  })
  @ApiBody({ type: CreateTrackDto })
  @ApiCreatedResponse({
    description: 'Successfully added the track to the library',
    type: TrackEntity,
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    const record = plainToClass(TrackEntity, createTrackDto);
    return this.tracksService.create(record);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all tracks',
    description: 'Retrieve a list of all tracks from the library.',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved all tracks',
    type: [TrackEntity],
  })
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get track by ID',
    description: 'Retrieve a track from the library by its unique ID.',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved the track by ID',
    type: TrackEntity,
  })
  @ApiNotFoundResponse({
    description: 'Track with the provided ID does not exist',
  })
  findOne(@Param('id') id: string) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const track = this.tracksService.findBy(id);
    if (!track) throw new HttpException('Track does not exist', 404);

    return track;
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update track by ID',
    description: 'Update a track in the library by its unique ID.',
  })
  @ApiBody({ type: UpdateTrackDto })
  @ApiOkResponse({
    description: 'Successfully updated the track by ID',
    type: TrackEntity,
  })
  @ApiNotFoundResponse({
    description: 'Track with the provided ID does not exist',
  })
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const track = this.tracksService.findBy(id);
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
  @ApiOperation({
    summary: 'Delete track by ID',
    description: 'Delete a track from the library by its unique ID.',
  })
  @ApiOkResponse({
    description: 'Successfully deleted the track by ID',
  })
  @ApiNotFoundResponse({
    description: 'Track with the provided ID does not exist',
  })
  remove(@Param('id') id: string) {
    if (!validate(id)) throw new InvalidUUIDExeption();

    const track = this.tracksService.findBy(id);
    if (!track) throw new HttpException('Track does not exist', 404);

    return this.tracksService.remove(id);
  }
}
