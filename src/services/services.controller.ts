import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorators';
import { UserRole } from '@prisma/client';

@Controller('services')
export class ServicesController {
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROFESSIONAL)
  @Post()
  create() {
    return { message: 'Service created successfully' };
  }
}
