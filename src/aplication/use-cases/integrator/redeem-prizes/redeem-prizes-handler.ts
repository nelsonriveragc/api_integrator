import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RedeemPrizesIntegrator } from './redeem-prizes-integrator';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@CommandHandler(RedeemPrizesIntegrator)
export class RedeemPrizesHandler
  implements ICommandHandler<RedeemPrizesIntegrator>
{
  private readonly externalApiKey: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.externalApiKey = this.configService.get<string>('externalApiKey');
  }

  async execute(command: RedeemPrizesIntegrator): Promise<any> {
    const headers = {
      'ApiKey-Camp': this.externalApiKey,
    };
    const { url, data } = command;
    const response = await firstValueFrom(
      this.httpService.post(url, data, { headers }),
    );
    return response.data;
  }
}
