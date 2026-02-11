import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateVocabularyDto {
  @ApiProperty({
    description: 'Word in English',
    example: 'listen',
  })
  @IsString()
  @MaxLength(120)
  word: string;

  @ApiProperty({
    description: 'Meaning or translation',
    example: 'escuchar',
  })
  @IsString()
  @MaxLength(300)
  meaning: string;

  @ApiProperty({
    description: 'Optional example sentence',
    required: false,
    example: 'I listen to podcasts every day.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(400)
  example?: string;

  @ApiProperty({
    description: 'Optional lesson id to relate the word',
    required: false,
    example: 'lesson1',
  })
  @IsOptional()
  @IsString()
  lessonId?: string;
}

export class UpdateVocabularyDto extends PartialType(CreateVocabularyDto) {}
