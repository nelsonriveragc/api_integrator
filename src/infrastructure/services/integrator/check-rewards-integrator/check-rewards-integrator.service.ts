import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { CheckRewardsIntegrator } from 'src/application/use-cases/integrator/check-rewards/check-rewards-integrator';

@Injectable()
export class CheckRewardsIntegratorService {
  private readonly externalApiUrl: string;

  constructor(
    private readonly queryBus: QueryBus,
    private readonly configService: ConfigService,
  ) {
    this.externalApiUrl = this.configService.get<string>('externalApiUrl');
  }

  async getCheckRewards(): Promise<any> {
    return this.queryBus.execute(new CheckRewardsIntegrator(`${this.externalApiUrl}/DeliPoints/getRewardsList`));
  }
}
