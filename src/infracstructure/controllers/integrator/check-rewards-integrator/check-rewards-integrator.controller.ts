import { Controller, Get } from '@nestjs/common';
import { CheckRewardsIntegratorService } from 'src/infracstructure/services/integrator/check-rewards-integrator/check-rewards-integrator.service';

@Controller('integrator')
export class CheckRewardsIntegratorController {
  constructor(
    private readonly checkRewardsIntegratorService: CheckRewardsIntegratorService,
  ) {}

  @Get('checkrewards')
  async getCheckRewards() {
    return this.checkRewardsIntegratorService.getCheckRewards();
  }
}
