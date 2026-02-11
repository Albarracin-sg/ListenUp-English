import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';
import { CreateVocabularyDto, UpdateVocabularyDto } from '../dto/vocabulary.dto';

@Injectable()
export class VocabularyService {
  constructor(private prisma: PrismaService) {}

  private normalizeWord(word: string) {
    return word.trim().toLowerCase();
  }

  async createEntry(userId: string, dto: CreateVocabularyDto) {
    const word = dto.word.trim();
    const meaning = dto.meaning.trim();
    const example = dto.example?.trim() || null;
    const lessonId = dto.lessonId?.trim();

    if (!word || !meaning) {
      throw new BadRequestException('Word and meaning are required');
    }

    if (lessonId) {
      const lesson = await this.prisma.lesson.findUnique({
        where: { id: lessonId },
      });

      if (!lesson) {
        throw new BadRequestException('Lesson not found');
      }
    }

    try {
      return await this.prisma.vocabularyEntry.create({
        data: {
          userId,
          lessonId: lessonId || null,
          word,
          normalizedWord: this.normalizeWord(word),
          meaning,
          example,
        },
      });
    } catch (error: any) {
      if (error?.code === 'P2002') {
        throw new BadRequestException('This word already exists in your vocabulary');
      }
      throw error;
    }
  }

  async listEntries(userId: string, search?: string, lessonId?: string) {
    const searchText = search?.trim();
    const lessonFilter = lessonId?.trim();

    return await this.prisma.vocabularyEntry.findMany({
      where: {
        userId,
        ...(lessonFilter ? { lessonId: lessonFilter } : {}),
        ...(searchText
          ? {
              OR: [
                { word: { contains: searchText, mode: 'insensitive' } },
                { meaning: { contains: searchText, mode: 'insensitive' } },
                { example: { contains: searchText, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateEntry(userId: string, id: string, dto: UpdateVocabularyDto) {
    const entry = await this.prisma.vocabularyEntry.findFirst({
      where: { id, userId },
    });

    if (!entry) {
      throw new NotFoundException('Vocabulary entry not found');
    }

    const updates: any = {};

    if (dto.word !== undefined) {
      const word = dto.word.trim();
      if (!word) {
        throw new BadRequestException('Word cannot be empty');
      }
      updates.word = word;
      updates.normalizedWord = this.normalizeWord(word);
    }

    if (dto.meaning !== undefined) {
      const meaning = dto.meaning.trim();
      if (!meaning) {
        throw new BadRequestException('Meaning cannot be empty');
      }
      updates.meaning = meaning;
    }

    if (dto.example !== undefined) {
      updates.example = dto.example?.trim() || null;
    }

    if (dto.lessonId !== undefined) {
      const lessonId = dto.lessonId?.trim();
      if (!lessonId) {
        updates.lessonId = null;
      } else {
        const lesson = await this.prisma.lesson.findUnique({
          where: { id: lessonId },
        });

        if (!lesson) {
          throw new BadRequestException('Lesson not found');
        }
        updates.lessonId = lessonId;
      }
    }

    try {
      return await this.prisma.vocabularyEntry.update({
        where: { id },
        data: updates,
      });
    } catch (error: any) {
      if (error?.code === 'P2002') {
        throw new BadRequestException('This word already exists in your vocabulary');
      }
      throw error;
    }
  }

  async deleteEntry(userId: string, id: string) {
    const entry = await this.prisma.vocabularyEntry.findFirst({
      where: { id, userId },
    });

    if (!entry) {
      throw new NotFoundException('Vocabulary entry not found');
    }

    return await this.prisma.vocabularyEntry.delete({
      where: { id },
    });
  }

  async getQuiz(userId: string, limit = 5) {
    const safeLimit = Math.min(Math.max(limit, 1), 20);
    const entries = await this.prisma.vocabularyEntry.findMany({
      where: { userId },
      take: 50,
      orderBy: { createdAt: 'desc' },
    });

    const shuffled = [...entries];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, safeLimit);
  }
}
