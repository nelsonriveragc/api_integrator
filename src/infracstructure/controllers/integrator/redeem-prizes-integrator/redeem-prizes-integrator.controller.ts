import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RedeemPrizesIntegratorDto } from 'src/infracstructure/dto/integrator/redeem-prizes-integrator.dto';
import { RedeemPrizesIntegratorService } from 'src/infracstructure/services/integrator/redeem-prizes-integrator/redeem-prizes-integrator.service';

@Controller('integrator')
export class RedeemPrizesIntegratorController {
  constructor(
    private readonly redeemPrizesIntegratorService: RedeemPrizesIntegratorService,
  ) {}

  @Post('redeemprizes')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createRedeemPrizes(
    @Body() redeemPrizesIntegratorDto: RedeemPrizesIntegratorDto,
  ) {
    return this.redeemPrizesIntegratorService.createRedeemPrizes(
      redeemPrizesIntegratorDto,
    );
  }
}
