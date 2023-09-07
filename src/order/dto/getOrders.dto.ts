import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class getOrdersDTO {
  @IsString()
  @IsOptional()
  tokenA?: string;

  @IsString()
  @IsOptional()
  tokenB?: string;

  @IsString()
  @IsOptional()
  user?: string;

  @IsBoolean()
  @IsOptional()
  active = false;
}
