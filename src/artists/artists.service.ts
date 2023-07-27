import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { ArtistEntity } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistsService extends InMemoryDBService<ArtistEntity> {
  create(createArtistDto: CreateArtistDto) {
    return super.create({
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });
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
    super.delete(id);
  }
}
