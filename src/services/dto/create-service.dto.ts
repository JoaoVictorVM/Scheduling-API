import { IsString, IsNotEmpty, IsInt, Min, IsNumber } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  duration: number; // minutos

  @IsNumber()
  @Min(0)
  price: number;
}
