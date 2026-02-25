import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
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

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROFESSIONAL)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new service',
    description:
      'Allows a professional to create a service that clients can book.',
  })
  @ApiResponse({
    status: 201,
    description: 'Service successfully created',
  })
  @ApiResponse({
    status: 403,
    description: 'Only professionals can create services',
  })
  @Post()
  create(@Body() dto: CreateServiceDto, @Request() req) {
    return this.servicesService.create(dto, req.user.id);
  }

  @ApiOperation({
    summary: 'List all available services',
    description: 'Returns a public list of all services available for booking.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of services',
  })
  @Get()
  findAll() {
    return this.servicesService.findAll();
  }
}
