import { v4 as uuidv4 } from 'uuid';

export class TrackEntity {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number

  constructor(data: Partial<TrackEntity>) {
    Object.assign(this, data);
    this.id = uuidv4();
  }
}
