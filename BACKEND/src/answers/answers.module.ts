import { Module } from '@nestjs/common';
import { AnswersService } from './services/answers.service';
import { AnswersController } from './answers.controller';
import { PrismaService } from '../common/services/prisma.service';

@Module({
  controllers: [AnswersController],
  providers: [AnswersService, PrismaService],
  exports: [AnswersService],
})
export class AnswersModule {}