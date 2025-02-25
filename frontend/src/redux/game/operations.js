import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader } from "../auth/operations";

export const joinBattle = createAsyncThunk(
  "room/join",
    async (_, thunkAPI) => {
      const state = thunkAPI.getState()
      try {
      setAuthHeader(state.auth.token);
      const res = await axios.post("/room/join");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
