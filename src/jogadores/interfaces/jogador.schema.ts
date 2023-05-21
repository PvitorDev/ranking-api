import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String },
    email: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    ranking: { type: String },
    rankingPosition: { type: Number },
    urlPicJogador: { type: String },
  },
  { timestamps: true, collection: 'jogadores' },
);
