-- CreateTable
CREATE TABLE "vocabulary_entries" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT,
    "word" TEXT NOT NULL,
    "normalizedWord" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "example" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vocabulary_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "vocabulary_entries_userId_idx" ON "vocabulary_entries"("userId");

-- CreateIndex
CREATE INDEX "vocabulary_entries_lessonId_idx" ON "vocabulary_entries"("lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "vocabulary_entries_userId_normalizedWord_key" ON "vocabulary_entries"("userId", "normalizedWord");

-- AddForeignKey
ALTER TABLE "vocabulary_entries" ADD CONSTRAINT "vocabulary_entries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vocabulary_entries" ADD CONSTRAINT "vocabulary_entries_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
