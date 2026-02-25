import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorators';
import { UserRole } from '@prisma/client';

@Controller('appointments')
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT, UserRole.PROFESSIONAL)
  @Post()
  create(@Body() dto: CreateAppointmentDto, @Request() req) {
    return this.appointmentsService.create(dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT, UserRole.PROFESSIONAL, UserRole.ADMIN)
  @Get()
  findAll(@Request() req) {
    return this.appointmentsService.findAll(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT, UserRole.PROFESSIONAL, UserRole.ADMIN)
  @Patch(':id/cancel')
  cancel(@Param('id') id: string, @Request() req) {
    return this.appointmentsService.cancel(Number(id), req.user);
  }

  @Patch(':id/complete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROFESSIONAL, UserRole.ADMIN)
  complete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.appointmentsService.complete(id, req.user);
  }
}
