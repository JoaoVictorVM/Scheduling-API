import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorators';
import { UserRole } from '@prisma/client';
import { RegisterDto } from '../auth/dto/register.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get logged user profile' })
  @ApiResponse({ status: 200, description: 'User profile data' })
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Create a professional user (Admin only)',
  })
  @ApiResponse({
    status: 201,
    description: 'Professional successfully created',
  })
  @ApiResponse({
    status: 403,
    description: 'Only admin can create professionals',
  })
  @Post('professional')
  createProfessional(@Body() dto: RegisterDto) {
    return this.usersService.createProfessional(dto);
  }
}
