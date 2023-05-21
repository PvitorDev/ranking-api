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
  Param,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { UpdateJogadorDto } from './dtos/update-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

import { JogadoresValidationParamsPipe } from './pipes/jogadores-validacao-paramentros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(
    @Body() criarJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    return await this.jogadoresService.criarJogador(criarJogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() updateJogadorDto: UpdateJogadorDto,
    @Param('_id', JogadoresValidationParamsPipe) _id: string,
  ): Promise<void> {
    await this.jogadoresService.atualizarJogador(_id, updateJogadorDto);
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[] | Jogador> {
    return await this.jogadoresService.consultarTodosJogadores();
  }

  @Get('/:_id')
  async consultarJogadoresPorId(
    @Param('_id', JogadoresValidationParamsPipe) _id: string,
  ): Promise<Jogador[] | Jogador> {
    if (_id) {
      return await this.jogadoresService.consultarJogadoresPorId(_id);
    }
    return;
  }

  @Delete('/:_id')
  async deletarJogador(
    @Query('_id', JogadoresValidationParamsPipe) _id: string,
  ): Promise<void> {
    this.jogadoresService.deletarJogador(_id);
  }
}
