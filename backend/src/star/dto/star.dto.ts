import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateStarDto {
  @ApiProperty({ description: 'The name of the actor.' })
  fullname: string;

  @ApiProperty({ description: 'Flag indicating if the actor has won an Oscar.' })
  hasOscar: boolean;
}

export class UpdateStarDto extends PartialType(CreateStarDto) {}