export const selectRoom = (state) => state.battle.room;
export const selectBattleStatus = (state) => state.battle.room.status;
export const selectBattleError = (state) => state.battle.error;
export const selectWinner = (state) => state.battle.room.winner;
