export interface CheckHealth {
  http: string;
  tcp: string;
  interval?: string;
  timeout?: string;
  ttl?: string;
  desregistercriticalserviceafter?: string;
}

export interface RegisterService {
  id: string;
  name: string;
  address: string;
  port: number;
  notes?: string;
  check?: CheckHealth;
}
