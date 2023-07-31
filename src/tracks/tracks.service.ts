import { Injectable } from '@nestjs/common';
import { TrackEntity } from './entities/track.entity';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TracksService {
  constructor(private databaseService: DatabaseService) {}

  create(record: TrackEntity) {
    return this.databaseService.tracks.create(record);
  }

  findAll() {
    return this.databaseService.tracks.findAll();
  }

  findBy(id: string) {
    return this.databaseService.tracks.findBy(id);
  }

  update(record: TrackEntity) {
    return this.databaseService.tracks.update(record);
  }

  remove(id: string) {
    const index = this.databaseService.favorites.tracks.findIndex(
      (track) => track.id === id,
    );
    this.databaseService.favorites.tracks.splice(index, 1);

    this.databaseService.tracks.remove(id);
  }
}
