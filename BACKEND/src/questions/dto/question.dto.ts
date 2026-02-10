import { IsString, IsEnum, IsArray, ArrayMinSize, ArrayMaxSize, IsNotEmpty, ValidateIf } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  FILL_BLANK = 'FILL_BLANK',
  OPEN = 'OPEN',
}

export class CreateQuestionDto {
  @ApiProperty({
    description: 'ID of the lesson this question belongs to',
    example: 'lesson123'
  })
  @IsString()
  lessonId: string;

  @ApiProperty({
    description: 'Type of the question',
    enum: QuestionType,
    example: QuestionType.MULTIPLE_CHOICE
  })
  @IsEnum(QuestionType)
  type: string;

  @ApiProperty({
    description: 'The question text',
    example: 'What is the correct form of "to be" for "I"?'
  })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({
    description: 'Options for multiple choice or true/false questions',
    required: false,
    example: ['is', 'am', 'are', 'be']
  })
  @IsArray()
  @ValidateIf(o => o.type === 'MULTIPLE_CHOICE' || o.type === 'TRUE_FALSE')
  @ArrayMinSize(2)
  @ArrayMaxSize(10)
  optionsForMultipleChoice?: string[];

  @ApiProperty({
    description: 'Options for fill in the blank questions',
    required: false,
    example: ['work', 'works', 'working']
  })
  @IsArray()
  @ValidateIf(o => o.type === 'FILL_BLANK')
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  optionsForFillBlank?: string[];

  @ApiProperty({
    description: 'The correct answer',
    example: 'am'
  })
  @IsString()
  @IsNotEmpty()
  correctAnswer: string;
}

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}