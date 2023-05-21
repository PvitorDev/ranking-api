import { IsNotEmpty, IsEmail } from 'class-validator';

export class CriarJogadorDto {
  @IsNotEmpty()
  readonly nome: string;
  @IsNotEmpty()
  readonly phoneNumber: string;
  @IsEmail()
  readonly email: string;
}
