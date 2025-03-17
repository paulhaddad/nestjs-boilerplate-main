// import {
//   // decorators here
//   Transform,
// } from 'class-transformer';
// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// import { FileDto } from '../../files/dto/file.dto';

// import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

// export class CreatePostDto {
//   @ApiProperty({ example: 'test1@example.com', type: String })
//   title: string;

//   @ApiPropertyOptional({ type: () => FileDto })
//   mediaUrl: FileDto;
// }
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { FileDto } from '../../files/dto/file.dto';

export class CreatePostDto {
  @ApiProperty({ example: 'test1@example.com', type: String })
  @IsString() // <-- Add a validation decorator
  @IsNotEmpty() // <-- Or @IsOptional() if you want to allow empty
  title: string;

  @ApiPropertyOptional({ type: () => FileDto })
  @ValidateNested() // <-- Required for nested DTO validation
  @Type(() => FileDto) // <-- Tells class-transformer how to handle nested object
  @IsOptional() // <-- If mediaUrl is optional
  mediaUrl: FileDto;
}
