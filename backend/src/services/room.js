import { RoomsCollection } from "../db/models/room.js";

export const findOrCreateRoom = async (playerId) => {
  let room = await RoomsCollection.findOne({ status: 'waiting' });

  if (room) {
    room.player_2 = playerId;
    room.status = 'in_progress';
    await room.save();
  } else {
    room = new RoomsCollection({ player_1: playerId });
    await room.save();
  }

  return room;
};
