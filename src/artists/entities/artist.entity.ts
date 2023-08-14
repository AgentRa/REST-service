import { v4 as uuidv4 } from 'uuid';

export class ArtistEntity {
  id: string; // uuid v4
  name: string;
  grammy: boolean;

  constructor(data: Partial<ArtistEntity>) {
    Object.assign(this, data);
    this.id = uuidv4();
  }
}
