import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  private readonly logger = new Logger(JogadoresService.name);

  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    this.criar(criarJogadorDto);
  }

  async atualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (!jogadorEncontrado)
      throw new NotFoundException('Não foi Possivel Atualizar Jogador');

    return await this.atualizar(criarJogadorDto);
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadorPorEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
    if (!jogadorEncontrado) throw new NotFoundException('Email não encontrado');

    return jogadorEncontrado;
  }

  async deletarJogador(email): Promise<any> {
    return await this.jogadorModel.deleteOne({ email }).exec();
  }

  private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadorModel
      .findOneAndUpdate(
        { email: criarJogadorDto.email },
        { $set: criarJogadorDto },
      )
      .exec();
  }

  private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const jogadorCriado = new this.jogadorModel(criarJogadorDto);

    return await jogadorCriado.save();
  }
}
