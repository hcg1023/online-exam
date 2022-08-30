import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class UpdatePasswordDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  newPassword: string;
}
