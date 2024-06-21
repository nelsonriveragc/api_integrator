import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { HttpModule } from '@nestjs/axios';
import { CqrsModule } from '@nestjs/cqrs';
import handlers_application from './aplication/handlers-export-application';
import controller_integrator from './infracstructure/controller-export-infrastructure';
import services_integrator from './infracstructure/services-export-infrastructure';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true, // Hace que el módulo de configuración esté disponible en toda la aplicación
    }),
    HttpModule,
    CqrsModule,
    PrismaModule,
  ],
  controllers: [...controller_integrator],
  providers: [...handlers_application, ...services_integrator],
})
export class AppModule {}
