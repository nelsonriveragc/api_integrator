import { HealthController } from './controllers/consul/hashicorp-consul.controller';
import { AcumulateIntegratorController } from './controllers/integrator/acumulate-integrator/acumulate-integrator.controller';
import { ChangeStatusOIntegratorController } from './controllers/integrator/change-status-o-integrator/change-status-o-integrator.controller';
import { CheckPointsIntegratorController } from './controllers/integrator/check-points-integrator/check-points-integrator.controller';
import { CheckRewardsIntegratorController } from './controllers/integrator/check-rewards-integrator/check-rewards-integrator.controller';
import { RedeemPrizesIntegratorController } from './controllers/integrator/redeem-prizes-integrator/redeem-prizes-integrator.controller';

const controller_integrator = [
  AcumulateIntegratorController,
  ChangeStatusOIntegratorController,
  CheckPointsIntegratorController,
  RedeemPrizesIntegratorController,
  CheckRewardsIntegratorController,
  HealthController
];

export default controller_integrator;
