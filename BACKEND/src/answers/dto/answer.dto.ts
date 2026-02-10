import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateAnswerDto {
  @ApiProperty({
    description: 'ID of the question being answered',
    example: 'question123'
  })
  @IsString()
  @IsNotEmpty()
  questionId: string;

  @ApiProperty({
    description: 'The answer provided by the user',
    example: 'am'
  })
  @IsString()
  @IsNotEmpty()
  answer: string;
}