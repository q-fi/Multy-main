// create-director.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDirectorDto {
  @ApiProperty({ description: 'The name of the director.' })
  @IsString()
  @IsNotEmpty()
  fullname: string;
}

export class UpdateDirectorDto extends PartialType(CreateDirectorDto) {
  @ApiProperty({ description: 'The name of the director.' })
  fullname: string;
}