import { IsString, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProgressDto {
  @ApiProperty({
    description: 'ID of the lesson',
    example: 'lesson123'
  })
  @IsString()
  lessonId: string;

  @ApiProperty({
    description: 'Score achieved by the user',
    minimum: 0,
    maximum: 100,
    example: 85
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  score: number;
}