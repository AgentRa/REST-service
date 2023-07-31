import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of the artist',
    example: '<NAME>',
    required: true,
  })
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: 'Grammy status of the artist',
    example: true,
    required: true,
    default: false,
  })
  grammy: boolean;
}
