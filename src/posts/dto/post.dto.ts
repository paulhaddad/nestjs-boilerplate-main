import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PostDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  id: string | number;
}
