import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from '@exceptions';
import { ResponseHttpInterceptor } from '@interceptors';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  // setDefaultUser();

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      stopAtFirstError: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new ResponseHttpInterceptor(),
  );

  // app.useGlobalFilters(new AllExceptionsFilter());

  app.setGlobalPrefix('api/v1');

  const documentBuilder = new DocumentBuilder()
    .setTitle('API IGNUG')
    .setDescription('App description')
    .setVersion('2')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
