import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AcumulateIntegratorDto } from 'src/infrastructure/dto/integrator/acumulate-integrator.dto';
import { AcumulateIntegratorService } from 'src/infrastructure/services/integrator/acumulate-integrator/acumulate-integrator.service';

@Controller('integrator')
export class AcumulateIntegratorController {
  constructor(
    private readonly acumulateIntegratorService: AcumulateIntegratorService,
  ) {}

  @Post('acumulate')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createAcumulate(
    @Body() createAcumulateIntegratorDto: AcumulateIntegratorDto,
  ) {
    return this.acumulateIntegratorService.createAcumulate(
      createAcumulateIntegratorDto,
    );
  }
}
