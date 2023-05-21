import { JogadoresService } from './jogadores.service';
import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';

import { Jogador } from './interfaces/jogador.interface';

import { JogadoresValidationParamsPipe } from './pipes/jogadores-validacao-paramentros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    await this.jogadoresService.criarJogador(criarJogadorDto);
  }

  @Put()
  async atualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    await this.jogadoresService.atualizarJogador(criarJogadorDto);
  }

  @Get()
  async consultarJogadores(
    @Query('email', JogadoresValidationParamsPipe) email: string,
  ): Promise<Jogador[] | Jogador> {
    if (email) {
      return await this.jogadoresService.consultarJogadorPorEmail(email);
    }
    return await this.jogadoresService.consultarTodosJogadores();
  }

  @Delete()
  async deletarJogador(
    @Query('email', JogadoresValidationParamsPipe) email: string,
  ): Promise<void> {
    this.jogadoresService.deletarJogador(email);
  }
}
