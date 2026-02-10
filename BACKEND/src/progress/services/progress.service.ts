import { PrismaService } from '../../common/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async createOrUpdateProgress(userId: string, lessonId: string, score: number) {
    // Validar que el usuario tenga acceso a la lección
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson || !lesson.isPublished) {
      throw new Error('Lesson not found or not published');
    }

    // Verificar si ya existe un progreso para este usuario y lección
    const existingProgress = await this.prisma.progress.findFirst({
      where: {
        userId,
        lessonId,
      },
    });

    if (existingProgress) {
      // Actualizar el progreso existente
      return await this.prisma.progress.update({
        where: {
          id: existingProgress.id,
        },
        data: {
          score,
          completed: new Date(),
        },
      });
    } else {
      // Crear nuevo registro de progreso
      return await this.prisma.progress.create({
        data: {
          userId,
          lessonId,
          score,
          completed: new Date(),
        },
      });
    }
  }

  // Método para calcular el score basado en respuestas correctas
  async calculateScore(userId: string, lessonId: string, correctAnswers: number, totalQuestions: number, answeredQuestions: number) {
    if (totalQuestions === 0) return 0;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    // Solo guardar progreso cuando se han respondido todas las preguntas
    if (answeredQuestions === totalQuestions && totalQuestions > 0) {
      return await this.createOrUpdateProgress(userId, lessonId, score);
    }

    return null; // No guardar progreso si no se han respondido todas las preguntas
  }

  async getUserProgress(userId: string) {
    return await this.prisma.progress.findMany({
      where: { userId },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            description: true,
            level: true,
          },
        },
      },
    });
  }

  async getLessonProgress(lessonId: string) {
    return await this.prisma.progress.findMany({
      where: { lessonId },
    });
  }

  async getUserLessonProgress(userId: string, lessonId: string) {
    return await this.prisma.progress.findFirst({
      where: {
        userId,
        lessonId,
      },
    });
  }
}