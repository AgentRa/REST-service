import { Module } from '@nestjs/common';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TracksModule } from './tracks/tracks.module';

@Module({
  imports: [AlbumsModule, ArtistsModule, FavoritesModule, TracksModule],
})
export class AppModule {}
