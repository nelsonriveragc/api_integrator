import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AcumulateIntegrator } from './acumulate-integrator';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@CommandHandler(AcumulateIntegrator)
export class AcumulateHandler implements ICommandHandler<AcumulateIntegrator> {
  private readonly externalApiKey: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.externalApiKey = this.configService.get<string>('externalApiKey');
  }

  async execute(command: AcumulateIntegrator): Promise<any> {
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
