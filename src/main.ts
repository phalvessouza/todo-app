import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
require('dotenv').config();

async function bootstrap() {
  // Inicializar a aplicação
  const app = await NestFactory.create(AppModule);

  // Habilitar o CORS
  app.enableCors();

  // Aplicar o filtro global de exceções
  app.useGlobalFilters(new HttpExceptionFilter());

  // Aplicar a validação globalmente
  app.useGlobalPipes(new ValidationPipe());

  // Aplicar o interceptor globalmente
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('The Todo API description')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addTag('Your API Tag')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Iniciar a aplicação
  await app.listen(process.env.PORT || 3000);
}
bootstrap();