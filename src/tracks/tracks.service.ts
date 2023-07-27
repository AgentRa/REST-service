import { Injectable } from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TracksService extends InMemoryDBService<TrackEntity> {
  create(record: TrackEntity) {
    return super.create(record);
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
