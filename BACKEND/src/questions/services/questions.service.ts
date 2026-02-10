import { PrismaService } from '../../common/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async findByLessonId(lessonId: string) {
    return await this.prisma.question.findMany({
      where: { lessonId },
      select: {
        id: true,
        type: true,
        question: true,
        options: true,
        // Correct answer is not returned to the frontend
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.question.findUnique({
      where: { id },
    });
  }

  async createQuestion(data: any) {
    // Ajustar el nombre de los campos según el tipo de pregunta
    const processedData = this.processOptionsByType(data);
    return await this.prisma.question.create({
      data: processedData,
    });
  }

  async updateQuestion(id: string, data: any) {
    // Ajustar el nombre de los campos según el tipo de pregunta
    const processedData = this.processOptionsByType(data);
    return await this.prisma.question.update({
      where: { id },
      data: processedData,
    });
  }

  private processOptionsByType(data: any) {
    // Si es MULTIPLE_CHOICE o TRUE_FALSE, usar optionsForMultipleChoice
    if (data.type === 'MULTIPLE_CHOICE' || data.type === 'TRUE_FALSE') {
      if (data.optionsForMultipleChoice) {
        return { ...data, options: data.optionsForMultipleChoice };
      }
    }
    // Si es FILL_BLANK, usar optionsForFillBlank
    else if (data.type === 'FILL_BLANK') {
      if (data.optionsForFillBlank) {
        return { ...data, options: data.optionsForFillBlank };
      }
    }

    // Si no hay campos específicos, usar el campo options estándar
    return data;
  }

  async deleteQuestion(id: string) {
    return await this.prisma.question.delete({
      where: { id },
    });
  }
}