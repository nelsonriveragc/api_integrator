import { AcumulateIntegratorDto } from "src/infracstructure/dto/integrator/acumulate-integrator.dto";

export class AcumulateIntegrator {
  constructor(
    public readonly url: string,
    public readonly data: AcumulateIntegratorDto,
  ) {}
}
