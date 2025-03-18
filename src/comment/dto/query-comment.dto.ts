import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Comments } from '../domain/comments';
import { RoleDto } from '../../roles/dto/role.dto';

export class FilterCommentDto {
  // @ApiPropertyOptional({ type: RoleDto })
  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => RoleDto)
  // roles?: RoleDto[] | null;
}

export class SortCommentDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Comments;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryCommentDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterCommentDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterCommentDto)
  filters?: FilterCommentDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortCommentDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortCommentDto)
  sort?: SortCommentDto[] | null;
}
export class QueryDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterCommentDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  filters?: null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortCommentDto, JSON.parse(value))
      : undefined;
  })
  sort?: null;
}
