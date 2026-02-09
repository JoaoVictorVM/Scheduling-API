import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; email: string; password: string }) {
    const user = await this.prisma.user.create({
      data,
    });

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
