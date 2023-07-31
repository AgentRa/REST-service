import { Injectable } from '@nestjs/common';
import { ArtistEntity } from './entities/artist.entity';
import { DatabaseService } from '../database/database.service';
import { TrackEntity } from '../tracks/entities/track.entity';
import { AlbumEntity } from '../albums/entities/album.entity';

@Injectable()
export class ArtistsService {
  constructor(private databaseService: DatabaseService) {}

  create(record: ArtistEntity) {
    return this.databaseService.artists.create(record);
  }

  findAll(): ArtistEntity[] {
    return this.databaseService.artists.findAll();
  }

  findBy(id: string) {
    return this.databaseService.artists.findBy(id);
  }

  update(record: ArtistEntity) {
    return this.databaseService.artists.update(record);
  }

  remove(id: string) {
    const tracksWithArtistId = this.databaseService.tracks.records.reduce(
      (acc: TrackEntity[], track: TrackEntity) => {
        if (track.artistId === id) acc.push(track);
        return acc;
      },
      [],
    );

    if (tracksWithArtistId.length) {
      tracksWithArtistId.map((track: TrackEntity) => {
        track.artistId = null;
        this.databaseService.tracks.update(track);
      });
    }

    const albumsWithArtistId = this.databaseService.albums.records.reduce(
      (acc: AlbumEntity[], album: AlbumEntity) => {
        if (album.artistId === id) acc.push(album);
        return acc;
      },
      [],
    );

    if (albumsWithArtistId.length) {
      albumsWithArtistId.map((album: AlbumEntity) => {
        album.artistId = null;
        this.databaseService.tracks.update(album);
      });
    }

    const index = this.databaseService.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );

    this.databaseService.favorites.artists.splice(index, 1);
    this.databaseService.artists.remove(id);
  }
}
