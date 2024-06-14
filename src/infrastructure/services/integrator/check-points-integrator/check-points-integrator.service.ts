// src/infrastructure/services/users.service.ts
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { CheckPointsIntegrator } from 'src/application/use-cases/integrator/check-points/check-points-integrator';

@Injectable()
export class CheckPointsIntegratorService {
  private readonly externalApiUrl: string;

  constructor(
    private readonly queryBus: QueryBus,
    private readonly configService: ConfigService,
  ) {
    this.externalApiUrl = this.configService.get<string>('externalApiUrl');
  }

  async getCheckPoints(id: string): Promise<any> {
    return this.queryBus.execute(new CheckPointsIntegrator(`${this.externalApiUrl}/DeliPoints/getDelipoints/${id}`));
  }
}
