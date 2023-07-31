import { Inject, Injectable } from '@nestjs/common';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { AlbumEntity } from '../albums/entities/album.entity';
import { TrackEntity } from '../tracks/entities/track.entity';
import { FavoriteEntity } from './entities/favorite.entity';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class FavoritesService {
  constructor(@Inject('DATABASE') private favorites: FavoriteEntity) {}

  @Inject(TracksService) private readonly tracksService: TracksService;
  @Inject(AlbumsService) private readonly albumsService: AlbumsService;
  @Inject(ArtistsService) private readonly artistService: ArtistsService;

  addToFavorites(
    type: 'artist' | 'album' | 'track',
    record: AlbumEntity | ArtistEntity | TrackEntity,
  ) {
    switch (type) {
      case 'artist':
        this.favorites.artists.push(record as ArtistEntity);
        break;
      case 'album':
        this.favorites.albums.push(record as AlbumEntity);
        break;
      case 'track':
        this.favorites.tracks.push(record as TrackEntity);
        break;
    }
  }

  findOneByType(type: 'artist' | 'album' | 'track', id: string) {
    switch (type) {
      case 'artist':
        return this.artistService.findOne(id);
      case 'album':
        return this.albumsService.findOne(id);
      case 'track':
        return this.tracksService.findOne(id);
    }
  }
}
