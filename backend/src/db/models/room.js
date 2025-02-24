import { model, Schema } from 'mongoose';

const roomSchema = new Schema({
  player_1: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  player_2: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  status: {
    type: String,
    enum: ['waiting', 'in_progress', 'finished'],
    default: 'waiting',
  },
  winner: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  created_at: { type: Date, default: Date.now },
});

export const RoomsCollection = model('rooms', roomSchema);
