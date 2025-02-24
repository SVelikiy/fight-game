import { processRound } from '../services/game.js';


export const playGame = (io) => {
  io.on('connection', (socket) => {
    console.log(`Player connected: ${socket.id}`);

    socket.on('join_battle', (roomId) => {
      socket.join(roomId);
      console.log(`Player ${socket.id} joined room ${roomId}`);
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
