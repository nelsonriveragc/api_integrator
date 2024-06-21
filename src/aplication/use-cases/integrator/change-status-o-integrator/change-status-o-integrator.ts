import { ChangeStatusOIntegratorDto } from "src/infracstructure/dto/integrator/change-status-o-integrator.dto";

export class ChangeStatusOIntegrator {
  constructor(
    public readonly url: string,
    public readonly data: ChangeStatusOIntegratorDto,
  ) {}
}
