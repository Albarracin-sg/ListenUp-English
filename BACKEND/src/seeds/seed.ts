import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Crear usuarios
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@listenup.com' },
    update: {},
    create: {
      email: 'admin@listenup.com',
      password: await bcrypt.hash('Admin123!', 10),
      role: 'ADMIN',
    },
  });

  const studentUser = await prisma.user.upsert({
    where: { email: 'student@listenup.com' },
    update: {},
    create: {
      email: 'student@listenup.com',
      password: await bcrypt.hash('Student123!', 10),
      role: 'STUDENT',
    },
  });

  // Crear lecciones
  const lesson1 = await prisma.lesson.upsert({
    where: { id: 'lesson1' },
    update: {},
    create: {
      id: 'lesson1',
      title: 'Introduction to English',
      description: 'Introductory lesson for beginners',
      level: 'beginner',
      youtubeUrl: 'https://youtu.be/ql9-75jhQxE', // Video from BBC Learning English
      isPublished: true,
    },
  });

  const lesson2 = await prisma.lesson.upsert({
    where: { id: 'lesson2' },
    update: {},
    create: {
      id: 'lesson2',
      title: 'Greetings and Introductions',
      description: 'Learn how to greet and introduce yourself in English',
      level: 'beginner',
      youtubeUrl: 'https://youtu.be/V7Dvcy0gq-U', // Video from Easy English
      isPublished: true,
    },
  });

  const lesson3 = await prisma.lesson.upsert({
    where: { id: 'lesson3' },
    update: {},
    create: {
      id: 'lesson3',
      title: 'Present Tense Verbs',
      description: 'Learn present tense verbs',
      level: 'beginner',
      youtubeUrl: 'https://youtu.be/NAVz0yfBZGo?si=O4IpzTE_MEiTSrgY', // Video from Learn English with real videos
      isPublished: true,
    },
  });

  const lesson4 = await prisma.lesson.upsert({
    where: { id: 'lesson4' },
    update: {},
    create: {
      id: 'lesson4',
      title: 'Past Tense',
      description: 'Learn to speak about the past',
      level: 'intermediate',
      youtubeUrl: 'https://youtu.be/_3Jl-4qrE5A?si=9EIuT4h83EWVfzEe', // Video from intermediate English
      isPublished: true,
    },
  });

  const lesson5 = await prisma.lesson.upsert({
    where: { id: 'lesson5' },
    update: {},
    create: {
      id: 'lesson5',
      title: 'Conditionals',
      description: 'Learn how to form conditionals in English',
      level: 'intermediate',
      youtubeUrl: 'https://youtu.be/kxocDuw0cKw', // Video from intermediate English
      isPublished: true,
    },
  });

  const lesson6 = await prisma.lesson.upsert({
    where: { id: 'lesson6' },
    update: {},
    create: {
      id: 'lesson6',
      title: 'Idiomatic Expressions',
      description: 'Learn common idiomatic expressions',
      level: 'advanced',
      youtubeUrl: 'https://youtu.be/MVGGGo_a5tI', // Video from advanced English
      isPublished: true,
    },
  });

  // Clear existing questions for these lessons to prevent duplicates
  await prisma.question.deleteMany({
    where: {
      OR: [
        { lessonId: lesson1.id },
        { lessonId: lesson2.id },
        { lessonId: lesson3.id },
        { lessonId: lesson4.id },
        { lessonId: lesson5.id },
        { lessonId: lesson6.id },
      ]
    }
  });

  // Create questions for each lesson
  // Lesson 1: Introduction to English
  await prisma.question.createMany({
    data: [
      {
        lessonId: lesson1.id,
        type: 'MULTIPLE_CHOICE',
        question: 'How do you say "Hello" in English?',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
        correctAnswer: 'Hello',
      },
      {
        lessonId: lesson1.id,
        type: 'TRUE_FALSE',
        question: 'The word "cat" means cat in English.',
        options: ['True', 'False'],
        correctAnswer: 'True',
      },
      {
        lessonId: lesson1.id,
        type: 'MULTIPLE_CHOICE',
        question: 'What is the color blue in English?',
        options: ['Red', 'Blue', 'Green', 'Yellow'],
        correctAnswer: 'Blue',
      },
      {
        lessonId: lesson1.id,
        type: 'MULTIPLE_CHOICE',
        question: 'How do you say "thanks" in English?',
        options: ['Please', 'Sorry', 'Thank you', 'Excuse me'],
        correctAnswer: 'Thank you',
      },
      {
        lessonId: lesson1.id,
        type: 'TRUE_FALSE',
        question: '"Dog" means dog in English.',
        options: ['True', 'False'],
        correctAnswer: 'True',
      },
      {
        lessonId: lesson1.id,
        type: 'OPEN' as any,
        question: 'Write a short sentence in English to say hello and your name.',
        options: [],
        correctAnswer: 'Hello my name is', // Simple check, real app might need more logic
      },
    ],
  });

  // Lesson 2: Greetings and Introductions
  await prisma.question.createMany({
    data: [
      {
        lessonId: lesson2.id,
        type: 'MULTIPLE_CHOICE',
        question: 'Which is a formal way to say hello?',
        options: ['Hi', 'Hey', 'Hello', 'What\'s up'],
        correctAnswer: 'Hello',
      },
      {
        lessonId: lesson2.id,
        type: 'MULTIPLE_CHOICE',
        question: 'How do you introduce yourself in English?',
        options: ['My name are...', 'I am called...', 'My name is...', 'Name it...'],
        correctAnswer: 'My name is...',
      },
      {
        lessonId: lesson2.id,
        type: 'TRUE_FALSE',
        question: 'It\'s appropriate to say "What\'s up?" in formal situations.',
        options: ['True', 'False'],
        correctAnswer: 'False',
      },
      {
        lessonId: lesson2.id,
        type: 'MULTIPLE_CHOICE',
        question: 'What does "Nice to meet you" mean?',
        options: ['See you later', 'Nice to meet you', 'Excuse me', 'Sorry'],
        correctAnswer: 'Nice to meet you',
      },
      {
        lessonId: lesson2.id,
        type: 'FILL_BLANK',
        question: 'Complete: "______ am from Spain."',
        options: ['I', 'You', 'He', 'She'],
        correctAnswer: 'I',
      },
    ],
  });

  // Lesson 3: Present Tense Verbs
  await prisma.question.createMany({
    data: [
      {
        lessonId: lesson3.id,
        type: 'MULTIPLE_CHOICE',
        question: 'What is the correct form of "to be" for "I"?',
        options: ['is', 'am', 'are', 'be'],
        correctAnswer: 'am',
      },
      {
        lessonId: lesson3.id,
        type: 'MULTIPLE_CHOICE',
        question: 'What is the correct form: "He _____ football every day."?',
        options: ['play', 'plays', 'playing', 'played'],
        correctAnswer: 'plays',
      },
      {
        lessonId: lesson3.id,
        type: 'TRUE_FALSE',
        question: 'The verb "to be" changes according to the subject in present tense.',
        options: ['True', 'False'],
        correctAnswer: 'True',
      },
      {
        lessonId: lesson3.id,
        type: 'MULTIPLE_CHOICE',
        question: 'What is the correct form: "They _____ happy."?',
        options: ['is', 'am', 'are', 'was'],
        correctAnswer: 'are',
      },
      {
        lessonId: lesson3.id,
        type: 'FILL_BLANK',
        question: 'Complete: "She _____ (work) in a bank."',
        options: ['work', 'works', 'working', 'worked'],
        correctAnswer: 'works',
      },
    ],
  });

  // Lesson 4: Past Tense
  await prisma.question.createMany({
    data: [
      {
        lessonId: lesson4.id,
        type: 'MULTIPLE_CHOICE',
        question: 'What is the past of "go"?',
        options: ['goed', 'went', 'going', 'gone'],
        correctAnswer: 'went',
      },
      {
        lessonId: lesson4.id,
        type: 'MULTIPLE_CHOICE',
        question: 'What is the correct form: "Yesterday I _____ to the store."?',
        options: ['go', 'going', 'went', 'goes'],
        correctAnswer: 'went',
      },
      {
        lessonId: lesson4.id,
        type: 'TRUE_FALSE',
        question: 'Regular verbs form the past by adding "-ed".',
        options: ['True', 'False'],
        correctAnswer: 'True',
      },
      {
        lessonId: lesson4.id,
        type: 'MULTIPLE_CHOICE',
        question: 'What is the past of "eat"?',
        options: ['eated', 'eated', 'ate', 'eated'],
        correctAnswer: 'ate',
      },
      {
        lessonId: lesson4.id,
        type: 'FILL_BLANK',
        question: 'Complete: "Last week she _____ (visit) her grandmother."',
        options: ['visit', 'visits', 'visited', 'visiting'],
        correctAnswer: 'visited',
      },
    ],
  });

  // Lesson 5: Conditionals
  await prisma.question.createMany({
    data: [
      {
        lessonId: lesson5.id,
        type: 'MULTIPLE_CHOICE',
        question: 'What is the correct structure of the first conditional?',
        options: [
          'If + past, would + verb',
          'If + present, will + verb',
          'If + past perfect, would have + verb',
          'If + present continuous, will + verb'
        ],
        correctAnswer: 'If + present, will + verb',
      },
      {
        lessonId: lesson5.id,
        type: 'MULTIPLE_CHOICE',
        question: 'Which is an example of second conditional?',
        options: [
          'If I study, I will pass the exam',
          'If I studied, I would pass the exam',
          'If I had studied, I would have passed the exam',
          'If I am studying, I will pass the exam'
        ],
        correctAnswer: 'If I studied, I would pass the exam',
      },
      {
        lessonId: lesson5.id,
        type: 'TRUE_FALSE',
        question: 'The third conditional is used for hypothetical situations in the past.',
        options: ['True', 'False'],
        correctAnswer: 'True',
      },
      {
        lessonId: lesson5.id,
        type: 'FILL_BLANK',
        question: 'Complete: "If I _____ (be) you, I would study harder."',
        options: ['am', 'was', 'were', 'will be'],
        correctAnswer: 'were',
      },
      {
        lessonId: lesson5.id,
        type: 'MULTIPLE_CHOICE',
        question: 'What is the correct form of the third conditional?',
        options: [
          'If + past, would + verb',
          'If + present, will + verb',
          'If + past perfect, would have + verb',
          'If + present perfect, would + verb'
        ],
        correctAnswer: 'If + past perfect, would have + verb',
      },
    ],
  });

  // Lesson 6: Idiomatic Expressions
  await prisma.question.createMany({
    data: [
      {
        lessonId: lesson6.id,
        type: 'MULTIPLE_CHOICE',
        question: 'What does the expression "Break a leg" mean?',
        options: [
          'Break your leg',
          'Good luck',
          'Study hard',
          'Take a break'
        ],
        correctAnswer: 'Good luck',
      },
      {
        lessonId: lesson6.id,
        type: 'MULTIPLE_CHOICE',
        question: 'What does "It\'s raining cats and dogs" mean?',
        options: [
          'It\'s snowing heavily',
          'There are many animals',
          'It\'s raining heavily',
          'It\'s dangerous to go out'
        ],
        correctAnswer: 'It\'s raining heavily',
      },
      {
        lessonId: lesson6.id,
        type: 'TRUE_FALSE',
        question: 'Idiomatic expressions have literal meanings.',
        options: ['True', 'False'],
        correctAnswer: 'False',
      },
      {
        lessonId: lesson6.id,
        type: 'MULTIPLE_CHOICE',
        question: 'What does "Time flies" mean?',
        options: [
          'Time flies',
          'You have to fly',
          'The clock is broken',
          'Run fast'
        ],
        correctAnswer: 'Time flies',
      },
      {
        lessonId: lesson6.id,
        type: 'FILL_BLANK',
        question: 'Complete: "Don\'t count your chickens before they _____.',
        options: ['hatch', 'fly', 'run', 'lay'],
        correctAnswer: 'hatch',
      },
    ],
  });

  console.log({ adminUser, studentUser, lesson1, lesson2, lesson3, lesson4, lesson5, lesson6 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });