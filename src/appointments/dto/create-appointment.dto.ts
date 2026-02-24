import { IsInt, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsInt()
  serviceId: number;

  @IsDateString()
  date: string;
}
