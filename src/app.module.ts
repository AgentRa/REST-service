import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';
import { FavoritesModule } from './favorites/favorites.module';
import { favoritesDB } from './favorites/favoritesDB';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    ArtistsModule,
    FavoritesModule,
    AlbumsModule,
    TracksModule,
    favoritesDB,
  ],
})
export class AppModule {}
