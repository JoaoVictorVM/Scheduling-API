import { Injectable, BadRequestException } from '@nestjs/common';
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

    // CLIENT
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
}
