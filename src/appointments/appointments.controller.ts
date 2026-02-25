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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Appointments')
@ApiBearerAuth()
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  @ApiOperation({
    summary: 'Create a new appointment',
    description:
      'Creates an appointment for a client with a professional. The date must be in the future and cannot conflict with existing appointments.',
  })
  @ApiResponse({
    status: 201,
    description: 'Appointment successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid date or time conflict',
  })
  @ApiResponse({
    status: 403,
    description: 'Only clients can create appointments',
  })
  @Post()
  create(@Body() dto: CreateAppointmentDto, @Request() req) {
    return this.appointmentsService.create(dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT, UserRole.PROFESSIONAL, UserRole.ADMIN)
  @ApiOperation({
    summary: 'List appointments based on user role',
    description:
      'Clients see their own appointments, professionals see appointments assigned to them, and admins see all appointments.',
  })
  @ApiResponse({
    status: 200,
    description: 'Appointments successfully retrieved',
  })
  @Get()
  findAll(@Request() req) {
    return this.appointmentsService.findAll(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT, UserRole.PROFESSIONAL, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Cancel an appointment',
    description:
      'Allows a client, professional, or admin to cancel an appointment. Completed appointments cannot be cancelled.',
  })
  @ApiResponse({
    status: 200,
    description: 'Appointment successfully cancelled',
  })
  @ApiResponse({
    status: 400,
    description: 'Appointment already cancelled or completed',
  })
  @ApiResponse({
    status: 403,
    description: 'User not authorized to cancel this appointment',
  })
  @ApiResponse({
    status: 404,
    description: 'Appointment not found',
  })
  @Patch(':id/cancel')
  cancel(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.appointmentsService.cancel(id, req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROFESSIONAL, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Mark appointment as completed',
    description:
      'Allows a professional or admin to mark an appointment as completed. Cancelled or already completed appointments cannot be modified.',
  })
  @ApiResponse({
    status: 200,
    description: 'Appointment successfully completed',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid appointment state',
  })
  @ApiResponse({
    status: 403,
    description: 'User not authorized to complete this appointment',
  })
  @ApiResponse({
    status: 404,
    description: 'Appointment not found',
  })
  @Patch(':id/complete')
  complete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.appointmentsService.complete(id, req.user);
  }
}
