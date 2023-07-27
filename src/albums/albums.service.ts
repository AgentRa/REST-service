import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { AlbumEntity } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumsService extends InMemoryDBService<AlbumEntity> {
  create(createAlbumDto: CreateAlbumDto) {
    return super.create({
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    });
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
    // TODO deletion for track
    // const tracksWithAlbumId = this.tracksService.query(
    //   (track) => track?.albumId === id,
    // );
    //
    // console.log('tracksWithAlbumId', tracksWithAlbumId);
    //
    // if (tracksWithAlbumId.length) {
    //   tracksWithAlbumId.map((track) => {
    //     track.albumId = null;
    //     this.tracksService.update(track);
    //   });
    // }
    super.delete(id);
  }
}
