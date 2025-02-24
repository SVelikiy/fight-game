import { model, Schema } from 'mongoose';

const BattleLogSchema = new Schema({
  room_id: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  player_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  attack_zone: { type: String, required: true },
  block_zone: { type: String, required: true },
  damage: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});

export const BattleLogCollection = model('battleLog', BattleLogSchema);
