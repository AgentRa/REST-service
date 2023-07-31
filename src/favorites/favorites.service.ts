import { Injectable } from '@nestjs/common';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { AlbumEntity } from '../albums/entities/album.entity';
import { TrackEntity } from '../tracks/entities/track.entity';
import { DatabaseService } from '../database/database.service';
import { FavoriteEntity } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(private databaseService: DatabaseService) {}

  findAll(): FavoriteEntity {
    return this.databaseService.favorites;
  }

  addToFavorites(
    type: 'artist' | 'album' | 'track',
    record: AlbumEntity | ArtistEntity | TrackEntity,
  ) {
    switch (type) {
      case 'artist':
        this.databaseService.favorites.artists.push(record as ArtistEntity);
        break;
      case 'album':
        this.databaseService.favorites.albums.push(record as AlbumEntity);
        break;
      case 'track':
        this.databaseService.favorites.tracks.push(record as TrackEntity);
        break;
    }
  }

  findOneByType(type: 'artist' | 'album' | 'track', id: string) {
    switch (type) {
      case 'artist':
        return this.databaseService.artists.findBy(id);
      case 'album':
        return this.databaseService.albums.findBy(id);
      case 'track':
        return this.databaseService.tracks.findBy(id);
    }
  }

  removeFromFavorites(type: 'artist' | 'album' | 'track', id: string): boolean {
    let index = -1;

    switch (type) {
      case 'artist':
        index = this.databaseService.favorites.artists.findIndex(
          (artist) => artist.id === id,
        );
        this.databaseService.favorites.artists.splice(index, 1);
        break;
      case 'album':
        index = this.databaseService.favorites.albums.findIndex(
          (album) => album.id === id,
        );
        this.databaseService.favorites.albums.splice(index, 1);
        break;
      case 'track':
        index = this.databaseService.favorites.tracks.findIndex(
          (track) => track.id === id,
        );
        this.databaseService.favorites.tracks.splice(index, 1);
        break;
    }
    return index !== -1;
  }
}
