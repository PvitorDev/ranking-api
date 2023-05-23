import * as mongoose from 'mongoose';

export const CategoriaSchema = new mongoose.Schema({
  categoria: { type: String, required: true },
  descricao: { type: String, required: true },
  eventos: [
    {
      nome: { type: String },
      operacao: { type: String },
      valor: { type: Number },
    },
  ],
  jogadores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Jogador' }],
});
