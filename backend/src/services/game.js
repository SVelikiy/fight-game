import {BattleLogCollection} from '../db/models/battleLog.js';
import { RoomsCollection } from '../db/models/room.js';

export const processRound = async (roomId, player1, player2, action1, action2) => {
  const damage1 = action1.attack_zone !== action2.block_zone ? 1 : 0;
  const damage2 = action2.attack_zone !== action1.block_zone ? 1 : 0;

  await BattleLogCollection.create({
    room_id: roomId,
    player_id: player1,
    attack_zone: action1.attack_zone,
    block_zone: action1.block_zone,
    damage: damage2,
  });

  await BattleLogCollection.create({
    room_id: roomId,
    player_id: player2,
    attack_zone: action2.attack_zone,
    block_zone: action2.block_zone,
    damage: damage1,
  });

  const room = await RoomsCollection.findById(roomId);
  if (!room) return null;

  room.hp = room.hp || {};
  room.hp[player1] = (room.hp[player1] || 10) - damage1;
  room.hp[player2] = (room.hp[player2] || 10) - damage2;

  if (room.hp[player1] <= 0 && room.hp[player2] <= 0) {
    room.status = 'finished';
  } else if (room.hp[player1] <= 0) {
    room.status = 'finished';
    room.winner = player2;
  } else if (room.hp[player2] <= 0) {
    room.status = 'finished';
    room.winner = player1;
  }

  await room.save();
  return room;
};
