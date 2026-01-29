import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AnswersService } from './services/answers.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ValidateAnswerDto } from './dto/answer.dto';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Answers')
@Controller('answers')
export class AnswersController {
  constructor(private answersService: AnswersService) {}

  @Post('validate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Validate an answer' })
  @ApiResponse({ status: 200, description: 'Answer validated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async validateAnswer(@Body() dto: ValidateAnswerDto) {
    return this.answersService.validateAnswer(dto.questionId, dto.answer);
  }
}