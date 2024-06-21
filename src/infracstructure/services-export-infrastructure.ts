import { AcumulateIntegratorService } from './services/integrator/acumulate-integrator/acumulate-integrator.service';
import { ChangeStatusOIntegratorService } from './services/integrator/change-status-o-integrator/change-status-o-integrator.service';
import { CheckPointsIntegratorService } from './services/integrator/check-points-integrator/check-points-integrator.service';
import { CheckRewardsIntegratorService } from './services/integrator/check-rewards-integrator/check-rewards-integrator.service';
import { RedeemPrizesIntegratorService } from './services/integrator/redeem-prizes-integrator/redeem-prizes-integrator.service';

const services_integrator = [
  AcumulateIntegratorService,
  ChangeStatusOIntegratorService,
  CheckPointsIntegratorService,
  RedeemPrizesIntegratorService,
  CheckRewardsIntegratorService,
];

export default services_integrator;
