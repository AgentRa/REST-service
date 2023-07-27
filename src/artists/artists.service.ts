import { Inject, Injectable } from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { ArtistEntity } from './entities/artist.entity';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';

@Injectable()
export class ArtistsService extends InMemoryDBService<ArtistEntity> {
  @Inject(TracksService) private readonly tracksService: TracksService;
  @Inject(AlbumsService) private readonly albumsService: AlbumsService;

  create(record: ArtistEntity) {
    return super.create(record);
  }

  findAll() {
    return super.getAll();
  }

  findOne(id: string) {
    return super.get(id);
  }

  update(artist: ArtistEntity) {
    super.update(artist);
    return artist;
  }

  remove(id: string) {
    const tracksWithArtistId = this.tracksService.query(
      (track) => track.artistId === id,
    );

    if (tracksWithArtistId.length) {
      tracksWithArtistId.map((track) => {
        track.artistId = null;
        this.tracksService.update(track);
      });
    }

    const albumsWithArtistId = this.albumsService.query(
      (album) => album.artistId === id,
    );

    if (albumsWithArtistId.length) {
      albumsWithArtistId.map((album) => {
        album.artistId = null;
        this.albumsService.update(album);
      });
    }

    super.delete(id);
  }
}
