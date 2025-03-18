import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { FileDto } from '../../files/dto/file.dto';

export class CreateCommentDto {
  @ApiProperty({ example: 'test1@example.com', type: String })
  @IsString() // <-- Add a validation decorator
  @IsNotEmpty() // <-- Or @IsOptional() if you want to allow empty
  content: string;

  @ApiProperty({ example: 'test1@example.com', type: String })
  @IsString() // <-- Add a validation decorator
  @IsNotEmpty() // <-- Or @IsOptional() if you want to allow empty
  location: string;

  @ApiProperty({ example: 'test1@example.com', type: String })
  @IsString() // <-- Add a validation decorator
  @IsNotEmpty() // <-- Or @IsOptional() if you want to allow empty
  device: string;
}
