import { Injectable } from '@nestjs/common';

import * as Consul from 'consul';

import IConsul from 'src/aplication/interfaces/I-Cosul';
import { RegisterService } from './interfaces/interface';

@Injectable()
export default class DiscoveryService implements IConsul {
  private readonly connection: Consul.Consul | null;

  constructor() {
    this.connection = new Consul({
      host: process.env.CONSUL_HOST || '127.0.0.1',
      port: process.env.CONSUL_PORT || '8500',
    });
  }

  async RegisterService(
    data: any,
    forceRegister: boolean = false,
  ): Promise<void> {
    try {
      const service: RegisterService = {
        id: `${process.env.SERVICE_ID || 'ECOMMERCE_APP_3000'}`,
        name: `${process.env.SERVICE_NAME || 'ECOMMERCE_APP'}`,
        address: `${process.env.HOST || '127.0.0.1'}`,
        port: Number(`${process.env.PORT || 3000}`),
        notes: 'Microservicio de comunicación con ecommerce',
        check: {
          http: `http://${process.env.HOST || '127.0.0.1'}:${
            process.env.PORT || 3000
          }/health`,
          tcp: `${process.env.HOST || '127.0.0.1'}:${process.env.PORT || 3000}`,
          interval: '10s',
          timeout: '1m',
          ttl: '60s',
          //deregistercriticalserviceafter:"1m"
        },
      };

      await this.connection.agent.service.register(service);

      //return true;
    } catch (error) {
      console.warn(error);
      if (forceRegister)
        setTimeout(async () => await this.RegisterService(data), 5000);
      //return false;
    }
  }

  GetService: (name: string) => Promise<any>;
}
