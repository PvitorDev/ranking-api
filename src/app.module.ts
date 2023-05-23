import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CategoriasModule } from './categorias/categorias.module';
@Module({
  imports: [
    JogadoresModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    CategoriasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
