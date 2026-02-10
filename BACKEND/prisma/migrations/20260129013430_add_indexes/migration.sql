-- CreateIndex
CREATE INDEX "lessons_level_idx" ON "lessons"("level");

-- CreateIndex
CREATE INDEX "lessons_isPublished_idx" ON "lessons"("isPublished");

-- CreateIndex
CREATE INDEX "progress_userId_lessonId_idx" ON "progress"("userId", "lessonId");

-- CreateIndex
CREATE INDEX "questions_lessonId_idx" ON "questions"("lessonId");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");
