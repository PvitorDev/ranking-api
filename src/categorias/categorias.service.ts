import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria } from './interfaces/categoria.interface';
import { Model } from 'mongoose';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
  ) {}

  async criarCategoria(
    criarCategoriaDto: CriarCategoriaDto,
  ): Promise<Categoria> {
    const { categoria } = criarCategoriaDto;
    const categoriaEncontrada = await this.categoriaModel
      .findOne({
        categoria,
      })
      .exec();
    if (categoriaEncontrada)
      throw new BadRequestException(`Categoria ${categoria} ja cadastrada`);

    const categoriaCriada = new this.categoriaModel(criarCategoriaDto);
    return await categoriaCriada.save();
  }

  async consultarTodasCategorias(): Promise<Array<Categoria>> {
    return await this.categoriaModel.find().exec();
  }

  async consultarCategoriaById(categoria): Promise<any> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({
        categoria,
      })
      .exec();
    if (!categoriaEncontrada) throw new NotFoundException(`Categoria não `);

    return categoriaEncontrada;
  }

  async atualizarCategoria(
    categoria: string,
    atualizarCategoriaDto: AtualizarCategoriaDto,
  ): Promise<void> {
    const categoriaEncontraoda = await this.categoriaModel
      .findOne({ categoria })
      .exec();
    if (!categoriaEncontraoda)
      throw new NotFoundException('Categoria não encontrada');

    await this.categoriaModel
      .findOneAndUpdate({ categoria }, { $set: atualizarCategoriaDto })
      .exec();
  }
}
