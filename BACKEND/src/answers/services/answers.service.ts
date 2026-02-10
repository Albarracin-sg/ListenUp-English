import { PrismaService } from '../../common/services/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class AnswersService {
  constructor(private prisma: PrismaService) {}

  async validateAnswer(questionId: string, answer: string) {
    // Validar que los parámetros no sean nulos
    if (!questionId || !answer) {
      throw new BadRequestException('Question ID and answer are required');
    }

    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      throw new BadRequestException('Question not found');
    }

    // Comparación case-insensitive
    const isCorrect = question.correctAnswer.toLowerCase() === answer.toLowerCase();

    return {
      isCorrect,
      correctAnswer: question.correctAnswer,
      questionId,
    };
  }
}