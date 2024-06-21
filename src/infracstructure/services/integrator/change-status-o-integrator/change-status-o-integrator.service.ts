import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { ChangeStatusOIntegrator } from 'src/aplication/use-cases/integrator/change-status-o-integrator/change-status-o-integrator';

@Injectable()
export class ChangeStatusOIntegratorService {
  private readonly externalApiUrl: string;

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly configService: ConfigService,
  ) {
    this.externalApiUrl = this.configService.get<string>('externalApiUrl');
  }

  async createStatusOrder(data: any): Promise<any> {
    return this.commandBus.execute(new ChangeStatusOIntegrator(`${this.externalApiUrl}/orders/UpdateOrderStatus`, data));
  }
}
