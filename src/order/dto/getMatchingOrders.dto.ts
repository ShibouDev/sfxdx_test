import { IsNumber, IsOptional, IsString } from 'class-validator';

export class getMatchingOrdersDTO {
  @IsString()
  tokenA?: string;

  @IsString()
  tokenB?: string;

  @IsString()
  @IsOptional()
  amountA?: string;

  @IsNumber()
  amountB?: string;
}
