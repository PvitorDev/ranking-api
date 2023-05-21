import { IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateJogadorDto {
  @IsNotEmpty()
  readonly nome: string;

  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsEmail()
  readonly email: string;
}
