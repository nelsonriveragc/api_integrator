import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpService } from '@nestjs/axios';
import { CheckPointsIntegrator } from './check-points-integrator';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@QueryHandler(CheckPointsIntegrator)
export class CheckPointsHandler
  implements IQueryHandler<CheckPointsIntegrator>
{
  private readonly externalApiKey: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.externalApiKey = this.configService.get<string>('externalApiKey');
  }

  async execute(query: CheckPointsIntegrator): Promise<any> {
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
