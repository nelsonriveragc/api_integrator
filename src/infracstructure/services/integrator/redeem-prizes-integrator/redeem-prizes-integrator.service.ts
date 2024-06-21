import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { RedeemPrizesIntegrator } from 'src/aplication/use-cases/integrator/redeem-prizes/redeem-prizes-integrator';

@Injectable()
export class RedeemPrizesIntegratorService {
  private readonly externalApiUrl: string;
  private readonly externalApiKey: string;

  constructor(
    private readonly commandBus: CommandBus,
    private readonly configService: ConfigService,
  ) {
    this.externalApiUrl = this.configService.get<string>('externalApiUrl');
    this.externalApiKey = this.configService.get<string>('externalApiKey');
  }

  async createRedeemPrizes(data: any): Promise<any> {
    return this.commandBus.execute(new RedeemPrizesIntegrator(`${this.externalApiUrl}/DeliPoints/ReedemPrize`, data));
  }
}
