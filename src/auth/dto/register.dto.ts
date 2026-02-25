import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({
    example: 'João Victor Martins',
    description: 'Full name of the user',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'teste@email.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Password (minimum 6 characters)',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.CLIENT,
    description: 'Role of the user',
  })
  @IsEnum(UserRole)
  role: UserRole;
}
