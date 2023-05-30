import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
  Get,
  Put,
  Param,
} from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';
import { CategoriasService } from './categorias.service';
import { CategoriaValidationParamsPipe } from './pipes/categorias-validacao-paramentros.pipe';
@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarCategoria(
    @Body() criarCategoriaDto: CriarCategoriaDto,
  ): Promise<Categoria> {
    return await this.categoriasService.criarCategoria(criarCategoriaDto);
  }

  @Get()
  async consultarCategoria(): Promise<Array<Categoria>> {
    return await this.categoriasService.consultarTodasCategorias();
  }

  @Get('/:categoria')
  async consultarCategoriaById(
    @Param('categoria', CategoriaValidationParamsPipe) categoria: string,
  ): Promise<Array<Categoria>> {
    return await this.categoriasService.consultarCategoriaById(categoria);
  }

  @Put('/:categoria')
  async atualizarCategoria(
    @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
    @Param('categoria') categoria: string,
  ): Promise<void> {
    await this.categoriasService.atualizarCategoria(
      categoria,
      atualizarCategoriaDto,
    );
  }
}
