import { AcumulateHandler } from './use-cases/integrator/acumulate-integrator/acumulate-handler';
import { ChangeStatusOHandler } from './use-cases/integrator/change-status-o-integrator/change-status-o-handler';
import { CheckPointsHandler } from './use-cases/integrator/check-points/check-points-handler';
import { CheckRewardsHandler } from './use-cases/integrator/check-rewards/check-rewards-handler';
import { RedeemPrizesHandler } from './use-cases/integrator/redeem-prizes/redeem-prizes-handler';

const handlers_application = [
  AcumulateHandler,
  ChangeStatusOHandler,
  CheckPointsHandler,
  RedeemPrizesHandler,
  CheckRewardsHandler,
];

export default handlers_application;
