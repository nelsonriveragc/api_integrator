// src/infrastructure/services/users.service.ts
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { AcumulateIntegrator } from 'src/application/use-cases/integrator/acumulate-integrator/acumulate-integrator';

@Injectable()
export class AcumulateIntegratorService {
  private readonly externalApiUrl: string;

  constructor(
    private readonly commandBus: CommandBus,
    private readonly configService: ConfigService,
  ) {
    this.externalApiUrl = this.configService.get<string>('externalApiUrl');
  }

  async createAcumulate(data: any): Promise<any> {
    return this.commandBus.execute(new AcumulateIntegrator(`${this.externalApiUrl}/DeliPoints/acumulatePoints`, data));
  }
}
