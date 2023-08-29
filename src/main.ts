import helmet from 'helmet';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Serverless Challenge API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  await app.listen(PORT, () => {
    console.log(`🚀 Api running on port ${PORT}`);
  });
}

bootstrap();