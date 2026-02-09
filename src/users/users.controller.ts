import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

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
}
