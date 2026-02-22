import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UseGuards, Get, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
    },
  ) {
    return this.usersService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
  
}
