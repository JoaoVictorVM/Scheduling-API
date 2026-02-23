import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorators';
import { UserRole } from '@prisma/client';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROFESSIONAL)
  @Post()
  create(@Body() dto: CreateServiceDto, @Request() req) {
    return this.servicesService.create(dto, req.user.id);
  }
}
