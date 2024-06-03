import mongoose, { Document, Schema } from 'mongoose';

export interface ISong extends Document {
  title: string;
  lyrics: string;
  singer: mongoose.Schema.Types.ObjectId;
}

const SongSchema: Schema<ISong> = new Schema({
    title: { type: String, required: true },
    lyrics: { type: String, required: true },
    singer: { type: mongoose.Schema.Types.ObjectId, ref: 'Singer', required: true }
});

export default mongoose.model<ISong>('Song', SongSchema);
