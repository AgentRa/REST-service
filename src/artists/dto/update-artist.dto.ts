import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArtistDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Artist name',
    example: '<NAME>',
  })
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    description: 'Grammy',
    example: true,
  })
  grammy: boolean;
}
