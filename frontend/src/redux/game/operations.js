import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader } from "../auth/operations";
import { socket } from "../../utils/socket";

export const joinBattle = createAsyncThunk("room/join", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    setAuthHeader(state.auth.token);
    console.log(state.auth.token);
    const res = await axios.post("/room/join");
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const sendPlayerAction = createAsyncThunk(
  "battle/sendAction",
  async ({ roomId, attack_zone, block_zone }, thunkAPI) => {
    try {
      const playerId = thunkAPI.getState().auth.user.id;
      socket.emit("player_action", {
        roomId,
        playerId,
        attack_zone,
        block_zone,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
