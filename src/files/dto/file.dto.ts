// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsString } from 'class-validator';

// export class FileDto {
//   @ApiProperty()
//   @IsString()
//   @IsNotEmpty()
//   id: string;

//   path: string;
// }
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FileDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  path: string;
}
