import { Controller, Get, Post, Body, UseGuards, Req, Param } from '@nestjs/common';
import { ProgressService } from './services/progress.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProgressDto } from './dto/progress.dto';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Progress') 
@Controller('progress')
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create or update user progress for a lesson' })
  @ApiResponse({ status: 200, description: 'Progress created or updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createOrUpdateProgress(
    @Req() req,
    @Body() dto: CreateProgressDto
  ) {
    return this.progressService.createOrUpdateProgress(
      req.user.id,
      dto.lessonId,
      dto.score
    );
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get authenticated user\'s progress' })
  @ApiResponse({ status: 200, description: 'Return user progress' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserProgress(@Req() req) {
    return this.progressService.getUserProgress(req.user.id);
  }

  @Get('lesson/:lessonId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get progress for a specific lesson' })
  @ApiResponse({ status: 200, description: 'Return lesson progress' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  async getLessonProgress(@Param('lessonId') lessonId: string) {
    return this.progressService.getLessonProgress(lessonId);
  }
}
