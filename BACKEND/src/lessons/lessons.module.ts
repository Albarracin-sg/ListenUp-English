import { Module } from '@nestjs/common';
import { LessonsService } from './services/lessons.service';
import { LessonsController } from './lessons.controller';
import { PrismaService } from '../common/services/prisma.service';

@Module({
  controllers: [LessonsController],
  providers: [LessonsService, PrismaService],
  exports: [LessonsService],
})
export class LessonsModule {}