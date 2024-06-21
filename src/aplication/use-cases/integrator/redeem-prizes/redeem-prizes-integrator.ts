import { RedeemPrizesIntegratorDto } from "src/infracstructure/dto/integrator/redeem-prizes-integrator.dto";

export class RedeemPrizesIntegrator {
  constructor(
    public readonly url: string,
    public readonly data: RedeemPrizesIntegratorDto,
  ) {}
}
