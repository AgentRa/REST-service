import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of the album',
    required: true,
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Year of the album',
    required: true,
  })
  year: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Description of the album',
  })
  artistId: string | null;
}
