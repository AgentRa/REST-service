import { Inject, Injectable } from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { AlbumEntity } from './entities/album.entity';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class AlbumsService extends InMemoryDBService<AlbumEntity> {
  @Inject(TracksService)
  private readonly tracksService: TracksService;

  create(record: AlbumEntity) {
    return super.create(record);
  }

  findAll() {
    return super.getAll();
  }

  findOne(id: string) {
    return super.get(id);
  }

  update(album: AlbumEntity) {
    super.update(album);
    return album;
  }

  remove(id: string) {
    const tracksWithAlbumId = this.tracksService.query(
      (track) => track?.albumId === id,
    );

    if (tracksWithAlbumId.length) {
      tracksWithAlbumId.map((track) => {
        track.albumId = null;
        this.tracksService.update(track);
      });
    }

    super.delete(id);
  }
}
