import { AcumulateIntegratorDto } from "src/infrastructure/dto/integrator/acumulate-integrator.dto";

export class AcumulateIntegrator {
  constructor(
    public readonly url: string,
    public readonly data: AcumulateIntegratorDto,
  ) {}
}
