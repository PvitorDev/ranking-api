import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { UpdateJogadorDto } from './dtos/update-jogador.dto';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
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

  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado)
      throw new BadRequestException('Não foi Possivel Criar Jogador');

    const jogadorCriado = new this.jogadorModel(criarJogadorDto);

    return await jogadorCriado.save();
  }

  async atualizarJogador(
    _id: string,
    updateJogadorDto: UpdateJogadorDto,
  ): Promise<void> {
    const jogadorEncontrado = this.jogadorModel.findOne({ _id }).exec();
    if (!jogadorEncontrado)
      throw new NotFoundException('Não foi Possivel Atualizar Jogador');

    await this.jogadorModel
      .findOneAndUpdate({ _id }, { $set: updateJogadorDto })
      .exec();
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async deletarJogador(_id): Promise<any> {
    const jogadorEncontrado = this.jogadorModel.findOne({ _id }).exec();
    if (!jogadorEncontrado)
      throw new NotFoundException('Não foi Possivel Atualizar Jogador');
    return await this.jogadorModel.deleteOne({ _id }).exec();
  }

  async consultarJogadoresPorId(_id): Promise<any> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();
    if (!jogadorEncontrado)
      throw new NotFoundException('Jogador não encontrado');

    return jogadorEncontrado;
  }
}
