import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'hashedPassword' })
  @IsNotEmpty()
  @IsString()
  hashedPassword: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  isActivated?: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  isBanned?: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
