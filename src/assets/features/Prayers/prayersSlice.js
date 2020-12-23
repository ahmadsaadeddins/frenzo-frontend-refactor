import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { prayerTimesToDate, PRAYER_NAMES, nextPrayer } from "../helpers/prayer";

export const prayersSlice = createSlice({
  name: "prayers",
  initialState: {
    prayers: {},
    comingPrayer: null,
    prayerCard: {},
  },
  reducers: {
    fetch: (state, action) => {
      state.prayers.today = action.payload[0];
      state.prayers.tomorrow = action.payload[1];
    },
    handlePrayerCard: (state) => {
      state.prayerCard = prayerTimesToDate(
        state.prayers.today,
        state.prayers.tomorrow,
        PRAYER_NAMES
      );
    },
    handleNextPrayer: (state) => {
      state.comingPrayer = nextPrayer(state.prayerCard);
    },
  },
});

export const {
  fetch,
  handlePrayerCard,
  handleNextPrayer,
} = prayersSlice.actions;

export const fetchAsync = (url) => async (dispatch) => {
  const res = await axios.get(url);
  dispatch(fetch(res.data));
  dispatch(handlePrayerCard());
  dispatch(handleNextPrayer());
};

export const prayers = (state) => state.prayers.prayers;
export const prayerCard = (state) => state.prayers.prayerCard;
export const comingPrayer = (state) => state.prayers.comingPrayer;

export default prayersSlice.reducer;
