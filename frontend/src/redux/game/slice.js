import { createSlice } from "@reduxjs/toolkit";
import { joinBattle } from "./operations";

const initialState = {
  room: {
    player_1: null,
    player_2: null,
    status: null,
    winner: null,
    _id: null,
    created_at: null,
    __v: 0
},
  error: false,
};

const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    leaveBattle: (state) => {
      state.room = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(joinBattle.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(joinBattle.fulfilled, (state, action) => {
        state.room = action.payload;
        state.status = "success";
      })
      .addCase(joinBattle.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export const { leaveBattle } = battleSlice.actions;
export const battleReduser = battleSlice.reducer;