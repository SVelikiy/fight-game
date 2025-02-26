import { RoomsCollection } from "../db/models/room.js";

export const findOrCreateRoom = async (playerId) => {
  let room = await RoomsCollection.findOne({ status: "waiting" });

  if (room) {
    room.player_2 = playerId;
    room.status = "in_progress";
    if (!room.hp) {
      room.hp = {};
    }
    room.hp.set(
      room.player_1.toString(),
      room.hp.get(room.player_1.toString()) || 10
    );
    room.hp.set(playerId.toString(), 10);

    await room.save();
  } else {
    room = new RoomsCollection({
      player_1: playerId,
      hp: new Map([[playerId.toString(), 10]]),
    });
    await room.save();
  }

  return room;
};
