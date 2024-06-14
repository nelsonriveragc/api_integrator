import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChangeStatusOIntegratorDto } from 'src/infrastructure/dto/integrator/change-status-o-integrator.dto';
import { ChangeStatusOIntegratorService } from 'src/infrastructure/services/integrator/change-status-o-integrator/change-status-o-integrator.service';

@Controller('integrator')
export class ChangeStatusOIntegratorController {
  constructor(
    private readonly changeStatusOIntegratorService: ChangeStatusOIntegratorService,
  ) {}

  @Post('statusorder')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createStatusOrder(
    @Body() createChangeStatusODto: ChangeStatusOIntegratorDto,
  ) {
    return this.changeStatusOIntegratorService.createStatusOrder(
      createChangeStatusODto,
    );
  }
}
