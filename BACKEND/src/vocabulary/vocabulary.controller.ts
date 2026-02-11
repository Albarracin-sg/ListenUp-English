import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateVocabularyDto, UpdateVocabularyDto } from './dto/vocabulary.dto';
import { VocabularyService } from './services/vocabulary.service';

@ApiTags('Vocabulary')
@Controller('vocabulary')
export class VocabularyController {
  constructor(private vocabularyService: VocabularyService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a word to user vocabulary' })
  @ApiResponse({ status: 201, description: 'Vocabulary entry created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Req() req, @Body() dto: CreateVocabularyDto) {
    return this.vocabularyService.createEntry(req.user.id, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List authenticated user vocabulary' })
  @ApiQuery({ name: 'search', required: false, description: 'Search by word or meaning' })
  @ApiQuery({ name: 'lessonId', required: false, description: 'Filter by lesson id' })
  @ApiResponse({ status: 200, description: 'Vocabulary entries list' })
  async list(
    @Req() req,
    @Query('search') search?: string,
    @Query('lessonId') lessonId?: string
  ) {
    return this.vocabularyService.listEntries(req.user.id, search, lessonId);
  }

  @Get('quiz')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a quick quiz from user vocabulary' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items' })
  @ApiResponse({ status: 200, description: 'Quiz items' })
  async getQuiz(@Req() req, @Query('limit') limit?: string) {
    const numericLimit = limit ? Number(limit) : 5;
    const parsedLimit = Number.isFinite(numericLimit) ? numericLimit : 5;
    return this.vocabularyService.getQuiz(req.user.id, parsedLimit);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a vocabulary entry' })
  @ApiResponse({ status: 200, description: 'Vocabulary entry updated' })
  async update(@Req() req, @Param('id') id: string, @Body() dto: UpdateVocabularyDto) {
    return this.vocabularyService.updateEntry(req.user.id, id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a vocabulary entry' })
  @ApiResponse({ status: 200, description: 'Vocabulary entry deleted' })
  async remove(@Req() req, @Param('id') id: string) {
    return this.vocabularyService.deleteEntry(req.user.id, id);
  }
}
