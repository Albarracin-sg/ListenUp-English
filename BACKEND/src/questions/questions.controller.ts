import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './services/questions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateQuestionDto, UpdateQuestionDto } from './dto/question.dto';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get('lesson/:lessonId')
  @ApiOperation({ summary: 'Get questions by lesson ID' })
  @ApiResponse({ status: 200, description: 'Return questions for the lesson' })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  async findByLessonId(@Param('lessonId') lessonId: string) {
    return this.questionsService.findByLessonId(lessonId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new question (Admin only)' })
  @ApiResponse({ status: 201, description: 'Question created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(@Body() dto: CreateQuestionDto) {
    return this.questionsService.createQuestion(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a question (Admin only)' })
  @ApiResponse({ status: 200, description: 'Question updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  async update(@Param('id') id: string, @Body() dto: UpdateQuestionDto) {
    return this.questionsService.updateQuestion(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a question (Admin only)' })
  @ApiResponse({ status: 200, description: 'Question deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  async remove(@Param('id') id: string) {
    return this.questionsService.deleteQuestion(id);
  }
}
