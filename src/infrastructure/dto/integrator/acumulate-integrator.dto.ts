import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class AcumulateIntegratorDto {
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsString()
  @IsNotEmpty()
  ndocument: string;

  @IsString()
  @IsNotEmpty()
  codeOrder: string;

  @IsString()
  @IsNotEmpty()
  CodeStore: string;
}
