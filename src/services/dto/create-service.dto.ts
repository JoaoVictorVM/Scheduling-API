import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsInt, Min } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 'Haircut' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Professional haircut service' })
  @IsString()
  description: string;

  @ApiProperty({ example: 50 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    example: 30,
    description: 'Duration in minutes',
  })
  @IsInt()
  @Min(1)
  duration: number;
}
