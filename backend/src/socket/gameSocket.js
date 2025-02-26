import { RoomsCollection } from '../db/models/room.js';
import { processRound } from '../services/game.js';


export const playGame = (io) => {
  io.on('connection', (socket) => {
    console.log(`Player connected: ${socket.id}`);

    socket.on('join_battle', async (roomId) => {
      socket.join(roomId);
      console.log(`Player ${socket.id} joined room ${roomId}`);
      const room = await RoomsCollection.findById(roomId);
      if (!room) return;
      if (!room.hp) {
                room.hp = new Map();
            }
            if (!room.hp.has(room.player_1.toString())) {
                room.hp.set(room.player_1.toString(), 10);
            }
            if (!room.hp.has(room.player_2.toString())) {
                room.hp.set(room.player_2.toString(), 10);
            }

            await room.save();

            console.log("Room HP after update:", room.hp);
            io.to(roomId).emit("update_state", room);
    });

   
    socket.on('player_action', async (data) => {
      try {
        const { roomId, player1, player2, action1, action2 } = data;

        const room = await processRound(
          roomId,
          player1,
          player2,
          action1,
          action2,
        );

        io.to(roomId).emit('round_result', {
          hp: room.hp,
          winner: room.winner,
          status: room.status,
        });
        if (room.status === 'finished') {
          io.to(roomId).emit('battle_finished', {
            winner: room.winner,
          });
        }
      } catch (err) {
        console.error('Error processing round:', err);
      }
    });
    socket.on('disconnect', () => {
      console.log(`Player disconnected: ${socket.id}`);
    });
  });
};
