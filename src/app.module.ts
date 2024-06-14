import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { HttpModule } from '@nestjs/axios';
import { CqrsModule } from '@nestjs/cqrs';
import handlers_application from './application/handlers-export-application';
import { AllExceptionsFilter } from './infrastructure/filters/all-exception.filter';
import { TransformResponseInterceptor } from './infrastructure/interceptors/transform-response.interceptors';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import controller_integrator from './infrastructure/controller-export-infrastructure';
import services_integrator from './infrastructure/services-export-infrastructure';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true, // Hace que el módulo de configuración esté disponible en toda la aplicación
    }),
    HttpModule,
    CqrsModule,
  ],
  controllers: [...controller_integrator],
  providers: [...handlers_application, ...services_integrator],
})
export class AppModule {}
