import { v4 as uuidv4 } from 'uuid';

export class AlbumEntity {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist

  constructor(data: Partial<AlbumEntity>) {
    Object.assign(this, data);
    this.id = uuidv4();
  }
}
