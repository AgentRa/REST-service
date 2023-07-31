import { Global, Module } from '@nestjs/common';
import { FavoriteEntity } from './entities/favorite.entity';

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE',
      useValue: {
        artists: [],
        albums: [],
        tracks: [],
      } as unknown as FavoriteEntity,
    },
  ],
  exports: ['DATABASE'],
})
export class favoritesDB {}
