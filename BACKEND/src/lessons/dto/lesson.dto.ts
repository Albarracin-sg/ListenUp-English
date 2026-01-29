import { IsString, IsEnum, IsBoolean, IsOptional, Matches } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export enum Level {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export class CreateLessonDto {
  @ApiProperty({
    description: 'Title of the lesson',
    example: 'Introduction to English'
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of the lesson',
    example: 'Introductory lesson for beginners'
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Level of the lesson',
    enum: Level,
    example: Level.BEGINNER
  })
  @IsEnum(Level)
  level: string;

  @ApiProperty({
    description: 'YouTube URL for the lesson',
    example: 'https://www.youtube.com/watch?v=example'
  })
  @Matches(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/, {
    message: 'URL must be a valid YouTube URL'
  })
  youtubeUrl: string;

  @ApiProperty({
    description: 'Whether the lesson is published',
    required: false,
    example: true
  })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}

export class UpdateLessonDto extends PartialType(CreateLessonDto) {}