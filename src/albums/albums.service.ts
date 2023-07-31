import { Injectable } from '@nestjs/common';
import { AlbumEntity } from './entities/album.entity';
import { DatabaseService } from '../database/database.service';
import { TrackEntity } from '../tracks/entities/track.entity';

@Injectable()
export class AlbumsService {
  constructor(private databaseService: DatabaseService) {}

  create(record: AlbumEntity) {
    return this.databaseService.albums.create(record);
  }

  findAll(): AlbumEntity[] {
    return this.databaseService.albums.findAll();
  }

  findBy(id: string) {
    return this.databaseService.albums.findBy(id);
  }

  update(record: AlbumEntity) {
    return this.databaseService.albums.update(record);
  }

  remove(id: string) {
    const tracksWithAlbumId = this.databaseService.tracks.records.reduce(
      (acc: TrackEntity[], track: TrackEntity) => {
        if (track?.albumId === id) acc.push(track);
        return acc;
      },
      [],
    );

    if (tracksWithAlbumId.length) {
      tracksWithAlbumId.map((track: TrackEntity) => {
        track.albumId = null;
        this.databaseService.tracks.update(track);
      });
    }

    const index = this.databaseService.favorites.albums.findIndex(
      (album) => album.id === id,
    );
    this.databaseService.favorites.albums.splice(index, 1);

    this.databaseService.albums.remove(id);
  }
}
