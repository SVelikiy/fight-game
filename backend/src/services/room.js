import { RoomsCollection } from "../db/models/room.js";

export const findOrCreateRoom = async (playerId) => {
  let room = await RoomsCollection.findOne({ status: "waiting" });

  if (room) {
    room.player_2 = playerId;
    room.status = "in_progress";
    if (!room.hp) {
      room.hp = {};
    }
    room.hp[room.player_1.toString()] = room.hp[room.player_1.toString()] || 10;
    room.hp[playerId.toString()] = 10;

    await room.save();
  } else {
    room = new RoomsCollection({
      player_1: playerId,
      hp: { [playerId.toString()]: 10 },
    });
    await room.save();
  }

  return room;
};
