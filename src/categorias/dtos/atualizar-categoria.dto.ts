import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';
import { Evento } from '../interfaces/categoria.interface';

export class AtualizarCategoriaDto {
  @IsString()
  @IsOptional()
  descricacao: string;

  @IsArray()
  @ArrayMinSize(1)
  evento: Array<Evento>;
}
