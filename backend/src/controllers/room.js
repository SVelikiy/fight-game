import { findOrCreateRoom } from '../services/room.js';

export const joinBattleController = async (req, res) => {
  const room = await findOrCreateRoom(req.user.id);
  res.status(200).json(room);
};
