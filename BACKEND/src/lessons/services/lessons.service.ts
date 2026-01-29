import { PrismaService } from '../../common/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async findAll(level?: string) {
    const whereClause: any = { isPublished: true };
    if (level) {
      whereClause.level = level;
    }

    return await this.prisma.lesson.findMany({
      where: whereClause,
      select: {
        id: true,
        title: true,
        description: true,
        level: true,
        youtubeUrl: true,
        createdAt: true,
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.lesson.findUnique({
      where: { id, isPublished: true },
      select: {
        id: true,
        title: true,
        description: true,
        level: true,
        youtubeUrl: true,
        createdAt: true,
      },
    });
  }

  async createLesson(data: any) {
    return await this.prisma.lesson.create({
      data,
    });
  }

  async updateLesson(id: string, data: any) {
    return await this.prisma.lesson.update({
      where: { id },
      data,
    });
  }

  async deleteLesson(id: string) {
    return await this.prisma.lesson.delete({
      where: { id },
    });
  }
}