import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAppointmentDto, userId: number) {
    const appointmentDate = new Date(dto.date);

    if (appointmentDate < new Date()) {
      throw new BadRequestException('Cannot schedule in the past');
    }

    const service = await this.prisma.service.findUnique({
      where: { id: dto.serviceId },
    });

    if (!service) {
      throw new BadRequestException('Service not found');
    }

    const existingAppointment = await this.prisma.appointment.findFirst({
      where: {
        professionalId: service.professionalId,
        date: appointmentDate,
      },
    });

    if (existingAppointment) {
      throw new BadRequestException('Time slot already booked');
    }

    return this.prisma.appointment.create({
      data: {
        date: appointmentDate,
        clientId: userId,
        professionalId: service.professionalId,
        serviceId: dto.serviceId,
      },
    });
  }
  async findAll(user: any) {
    if (user.role === 'ADMIN') {
      return this.prisma.appointment.findMany({
        include: {
          service: true,
          client: {
            select: { id: true, name: true, email: true },
          },
          professional: {
            select: { id: true, name: true, email: true },
          },
        },
      });
    }

    if (user.role === 'PROFESSIONAL') {
      return this.prisma.appointment.findMany({
        where: {
          professionalId: user.id,
        },
        include: {
          service: true,
          client: {
            select: { id: true, name: true, email: true },
          },
        },
      });
    }

    return this.prisma.appointment.findMany({
      where: {
        clientId: user.id,
      },
      include: {
        service: true,
        professional: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  async cancel(id: number, user: any) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    if (user.role === 'CLIENT' && appointment.clientId !== user.id) {
      throw new ForbiddenException('You can only cancel your own appointments');
    }

    if (
      user.role === 'PROFESSIONAL' &&
      appointment.professionalId !== user.id
    ) {
      throw new ForbiddenException('You can only cancel your own appointments');
    }

    if (appointment.status === 'COMPLETED') {
      throw new BadRequestException(
        'Completed appointments cannot be cancelled',
      );
    }

    if (appointment.status === 'CANCELLED') {
      throw new BadRequestException('Appointment already cancelled');
    }

    return this.prisma.appointment.update({
      where: { id },
      data: {
        status: 'CANCELLED',
      },
    });
  }

  async complete(id: number, user: any) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    if (user.role === 'CLIENT') {
      throw new ForbiddenException(
        'Clients cannot mark appointments as completed',
      );
    }

    if (
      user.role === 'PROFESSIONAL' &&
      appointment.professionalId !== user.id
    ) {
      throw new ForbiddenException(
        'You can only complete your own appointments',
      );
    }

    if (appointment.status === 'CANCELLED') {
      throw new BadRequestException(
        'Cancelled appointments cannot be completed',
      );
    }

    if (appointment.status === 'COMPLETED') {
      throw new BadRequestException('Appointment already completed');
    }

    return this.prisma.appointment.update({
      where: { id },
      data: {
        status: 'COMPLETED',
      },
    });
  }
}
