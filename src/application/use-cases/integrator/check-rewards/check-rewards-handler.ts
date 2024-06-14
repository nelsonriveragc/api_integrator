import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpService } from '@nestjs/axios';
import { CheckRewardsIntegrator } from './check-rewards-integrator';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@QueryHandler(CheckRewardsIntegrator)
export class CheckRewardsHandler
  implements IQueryHandler<CheckRewardsIntegrator>
{
  private readonly externalApiKey: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.externalApiKey = this.configService.get<string>('externalApiKey');
  }

  async execute(query: CheckRewardsIntegrator): Promise<any> {
    const headers = {
      'ApiKey-Camp': this.externalApiKey,
    };
    const { url } = query;
    const response = await firstValueFrom(
      this.httpService.get(url, { headers }),
    );
    return response.data;
  }
}
