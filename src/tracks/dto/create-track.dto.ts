import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: 'This is an optional property',
  })
  artistId: string | null;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: 'This is an optional property',
  })
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  duration: number;
}
