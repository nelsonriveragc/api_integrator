import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChangeStatusOIntegrator } from './change-status-o-integrator';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@CommandHandler(ChangeStatusOIntegrator)
export class ChangeStatusOHandler
  implements ICommandHandler<ChangeStatusOIntegrator>
{
  private readonly externalApiKey: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.externalApiKey = this.configService.get<string>('externalApiKey');
  }

  async execute(command: ChangeStatusOIntegrator): Promise<any> {
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
