import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class RedeemPrizesIntegratorDto {
  @IsArray()
  @IsNotEmpty()
  codePrize: string;

  @IsString()
  @IsNotEmpty()
  codeStore: string;

  @IsString()
  @IsNotEmpty()
  codeOrder: string;

  @IsString()
  @IsNotEmpty()
  idDocumentUser: string;
}
