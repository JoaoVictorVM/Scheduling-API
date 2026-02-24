import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto, professionalId: number) {
    return this.prisma.service.create({
      data: {
        ...createServiceDto,
        professionalId,
      },
    });
  }

  async findAll() {
    return this.prisma.service.findMany({
      include: {
        professional: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }
}
