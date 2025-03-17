import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Posts } from '../domain/posts';
import { RoleDto } from '../../roles/dto/role.dto';

export class FilterPostDto {
  // @ApiPropertyOptional({ type: RoleDto })
  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => RoleDto)
  // roles?: RoleDto[] | null;
}

export class SortPostDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Posts;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryPostDto {
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
    value ? plainToInstance(FilterPostDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterPostDto)
  filters?: FilterPostDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? plainToInstance(SortPostDto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortPostDto)
  sort?: SortPostDto[] | null;
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
    value ? plainToInstance(FilterPostDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  filters?: null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? plainToInstance(SortPostDto, JSON.parse(value)) : undefined;
  })
  sort?: null;
}
