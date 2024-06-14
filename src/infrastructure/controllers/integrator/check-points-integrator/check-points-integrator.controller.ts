import { Controller, Get, Param } from '@nestjs/common';
import { CheckPointsIntegratorService } from 'src/infrastructure/services/integrator/check-points-integrator/check-points-integrator.service';

@Controller('integrator')
export class CheckPointsIntegratorController {
  constructor(
    private readonly checkPointsIntegratorService: CheckPointsIntegratorService,
  ) {}

  @Get('checkpoints/:id')
  async getCheckPoints(@Param('id') id: string) {
    return this.checkPointsIntegratorService.getCheckPoints(id);
  }
}
