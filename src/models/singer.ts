import { Schema, model, Document } from 'mongoose';

export interface ISinger extends Document {
  name: string;
  genre: string;
  imageUrl: string;
}

const SingerSchema: Schema<ISinger> = new Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

export default model<ISinger>('Singer', SingerSchema);
