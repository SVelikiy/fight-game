import { RoomsCollection } from "../db/models/room.js";
import { processRound } from "../services/game.js";

export const playGame = (io) => {
  io.on("connection", (socket) => {
    console.log(`Player connected: ${socket.id}`);

    socket.on("join_battle", async (roomId) => {
      socket.join(roomId);
      console.log(`Player ${socket.id} joined room ${roomId}`);

      const room = await RoomsCollection.findById(roomId);
      if (!room) return;

      if (!room.hp) {
        room.hp = {};
      }

      if (!room.hp[room.player_1]) {
        room.hp[room.player_1] = 10;
      }
      if (!room.hp[room.player_2]) {
        room.hp[room.player_2] = 10;
      }

      await room.save();
      console.log("Room HP after update:", room.hp);
      io.to(roomId).emit("update_state", room);
    });

    socket.on("player_action", async (data) => {
      try {
        const { roomId, playerId, attack_zone, block_zone } = data;

        const room = await RoomsCollection.findById(roomId);
        if (!room || room.status !== "in_progress") return;
        if (!room.actions) {
          room.actions = {};
        }

        room.actions[playerId] = { attack_zone, block_zone };

        if (Object.keys(room.actions).length === 2) {
          const player1 = room.player_1.toString();
          const player2 = room.player_2.toString();
          const action1 = room.actions[player1];
          const action2 = room.actions[player2];


          if (!action1 || !action2) {
            console.error("❌ Дії одного з гравців відсутні!", {
              action1,
              action2,
            });
            return;
          }

          const updatedRoom = await processRound(
            roomId,
            player1,
            player2,
            action1,
            action2
          );
          room.actions = {}; 
          await room.save();

          io.to(roomId).emit("round_result", {
            hp: updatedRoom.hp,
            winner: updatedRoom.winner,
            status: updatedRoom.status,
          });

          if (updatedRoom.status === "finished") {
            io.to(roomId).emit("battle_finished", {
              winner: updatedRoom.winner,
            });
          }
        } else {
          await room.save();
        }
      } catch (err) {
        console.error("❌ Error", err);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Player disconnected: ${socket.id}`);
    });
  });
};
