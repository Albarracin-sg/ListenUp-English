import { Module } from '@nestjs/common';
import { ProgressService } from './services/progress.service';
import { ProgressController } from './progress.controller';
import { PrismaService } from '../common/services/prisma.service';

@Module({
  controllers: [ProgressController],
  providers: [ProgressService, PrismaService],
  exports: [ProgressService],
})
export class ProgressModule {}