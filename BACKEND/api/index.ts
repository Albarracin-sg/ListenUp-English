import './env';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import express = require('express');
import { AppModule } from '../src/app.module';
import { AllExceptionsFilter } from '../src/common/filters/all-exceptions.filter';
import { TransformInterceptor } from '../src/common/interceptors/transform.interceptor';
import { RolesGuard } from '../src/auth/guards/roles.guard';

let cachedServer: ((req: any, res: any) => void) | null = null;

async function bootstrap() {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new RolesGuard(reflector));

  const config = new DocumentBuilder()
    .setTitle('ListenUp English API')
    .setDescription('API for the ListenUp English learning platform')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api');

  app.getHttpAdapter().get('/', (_req, res) => {
    res.send('backend corriendo ;)');
  });

  await app.init();
  return expressApp;
}

export default async function handler(req: any, res: any) {
  const server = cachedServer ?? (cachedServer = await bootstrap());
  return server(req, res);
}
