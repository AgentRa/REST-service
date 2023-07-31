import { Injectable } from '@nestjs/common';

import { ArtistEntity } from '../artists/entities/artist.entity';
import { AlbumEntity } from '../albums/entities/album.entity';
import { TrackEntity } from '../tracks/entities/track.entity';
import { UserEntity } from '../users/entities/user.entity';
import { BaseDataAccessObject } from './BaseDataAccessObject';
import { FavoriteEntity } from '../favorites/entities/favorite.entity';

@Injectable()
export class DatabaseService {
  private database: {
    users: any;
    artists: any;
    tracks: any;
    albums: any;
    favorites: FavoriteEntity;
  };

  constructor() {
    this.database = {
      users: new BaseDataAccessObject<UserEntity>(),
      artists: new BaseDataAccessObject<ArtistEntity>(),
      tracks: new BaseDataAccessObject<TrackEntity>(),
      albums: new BaseDataAccessObject<AlbumEntity>(),
      favorites: {
        artists: [] as ArtistEntity[],
        albums: [] as AlbumEntity[],
        tracks: [] as TrackEntity[],
      },
    };
  }

  get users() {
    return this.database.users;
  }

  get artists() {
    return this.database.artists;
  }

  get albums() {
    return this.database.albums;
  }

  get tracks() {
    return this.database.tracks;
  }

  get favorites() {
    return this.database.favorites;
  }
}
