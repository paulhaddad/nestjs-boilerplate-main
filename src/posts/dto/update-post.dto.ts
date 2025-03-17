import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';
import { FileEntity } from '../../files/infrastructure/persistence/relational/entities/file.entity';
import { JoinColumn, ManyToOne } from 'typeorm';
import { Type } from 'class-transformer';

// export class UpdatePostDto extends PartialType(CreatePostDto) {
//   @ApiPropertyOptional({ example: 'title', type: String })
//   title: string;

//   // @ApiPropertyOptional({ type: () => FileDto })
//   // @IsOptional()
//   // mediaUrl: FileDto;
//   @ManyToOne(() => FileEntity, { nullable: true, cascade: true })
//   @JoinColumn({ name: 'mediaUrlId' })
//   mediaUrl: FileEntity;
// }
export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiPropertyOptional({ example: 'A Sample Post Title', type: String })
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => FileDto)
  mediaUrl: FileDto;
}
