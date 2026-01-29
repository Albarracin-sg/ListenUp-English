import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    minLength: 6,
    maxLength: 20,
    example: 'password123'
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}