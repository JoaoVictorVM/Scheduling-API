import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the service being booked',
  })
  @IsInt()
  serviceId: number;

  @ApiProperty({
    example: '2026-03-15T14:00:00.000Z',
    description: 'Date and time of the appointment (ISO format)',
  })
  @IsDateString()
  date: string;
}
