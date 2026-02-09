export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: string;
  youtubeUrl: string;
  isPublished: boolean;
}

export interface Question {
  id: string;
  type: string;
  question: string;
  options?: string[]; // New field from backend
  optionsForMultipleChoice?: string[];
  optionsForFillBlank?: string[];
  correctAnswer: string;
}