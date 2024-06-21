import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ChangeStatusOIntegratorDto {
  @IsString()
  @IsNotEmpty()
  Order: string;

  @IsNumber()
  @IsNotEmpty()
  OrderStatus: number;
}
