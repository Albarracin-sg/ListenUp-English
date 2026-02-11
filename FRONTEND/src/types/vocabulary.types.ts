export interface VocabularyEntry {
  id: string;
  word: string;
  meaning: string;
  example?: string | null;
  lessonId?: string | null;
  createdAt: string;
  updatedAt: string;
}
