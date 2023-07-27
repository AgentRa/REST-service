import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  artistId: string | null;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
