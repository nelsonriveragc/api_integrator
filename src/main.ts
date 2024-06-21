import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformResponseInterceptor } from './infracstructure/interceptors/transform-response.interceptors';
import { AllExceptionsFilter } from './infracstructure/filters/all-exception.filter';
import { PrismaService } from './prisma/prisma.service';
import DiscoveryService from './infracstructure/services/consul/hashicorp-consul.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const consul = new DiscoveryService();
  const prismaService = app.get(PrismaService);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformResponseInterceptor(prismaService));
  app.useGlobalFilters(new AllExceptionsFilter());
  await consul.RegisterService(null, true);
  await app.listen(3000);
}
bootstrap();
