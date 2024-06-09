import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'the email of user',
    example: 'testing@nycdating.com',
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '12341234' })
  readonly password: string;
}
