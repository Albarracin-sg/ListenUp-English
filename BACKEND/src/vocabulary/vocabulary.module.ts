import { Module } from '@nestjs/common';
import { VocabularyController } from './vocabulary.controller';
import { VocabularyService } from './services/vocabulary.service';
import { PrismaService } from '../common/services/prisma.service';

@Module({
  controllers: [VocabularyController],
  providers: [VocabularyService, PrismaService],
})
export class VocabularyModule {}
