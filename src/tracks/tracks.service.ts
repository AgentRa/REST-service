import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { TrackEntity } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TracksService extends InMemoryDBService<TrackEntity> {
  create(createTrackDto: CreateTrackDto) {
    return super.create({
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    });
  }

  findAll() {
    return super.getAll();
  }

  findOne(id: string) {
    return super.get(id);
  }

  update(track: TrackEntity) {
    super.update(track);
    return track;
  }

  remove(id: string) {
    super.delete(id);
  }
}
