import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';
import { FileEntity } from '../../files/infrastructure/persistence/relational/entities/file.entity';
import { JoinColumn, ManyToOne } from 'typeorm';
import { Type } from 'class-transformer';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiPropertyOptional({ example: 'A Sample Comment Title', type: String })
  @IsOptional()
  @IsString()
  content: string;

  @ApiPropertyOptional({ example: 'A Sample Comment Title', type: String })
  @IsOptional()
  @IsString()
  location: string;

  @ApiPropertyOptional({ example: 'A Sample Comment Title', type: String })
  @IsOptional()
  @IsString()
  device: string;
}
