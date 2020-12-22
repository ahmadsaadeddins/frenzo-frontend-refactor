import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Helpers
export const PRAYER_NAMES = [
  "fajr",
  "sunrise",
  "dhuhr",
  "asr",
  "maghrib",
  "isha",
];
export const ARABICNUMBERS = ["۰", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export const convertToArabic = (number) => {
  return String(number)
    .split("")
    .map((char) => ARABICNUMBERS[Number(char)] || char)
    .join("");
};

const convertTimeToDateTime = (time, extraDay = 0) => {
  const date = new Date();
  date.setHours(time.slice(0, 2));
  date.setMinutes(time.slice(3, 5));
  date.setSeconds(0);
  date.setDate(date.getDate() + extraDay);
  return date;
};

let prayerTimesToDate = (today, tomorrow, prayerNames) =>
  prayerNames.reduce((dateFormated, key) => {
    if (today[key].length === 8) {
      dateFormated[key] = convertTimeToDateTime(today[key], 0);
    } else {
      dateFormated[key] = today[key];
    }

    return {
      ...dateFormated,
      fajrTmrw: convertTimeToDateTime(tomorrow["fajr"], 1),
    };
  }, {});

const nextPrayer = (day) => {
  let comingPrayer;

  const now = new Date();

  if (now < day["sunrise"] && now > day["fajr"]) {
    comingPrayer = day["sunrise"];
  } else if (now <= day["dhuhr"] && now > day["sunrise"]) {
    comingPrayer = day["dhuhr"];
  }
  if (now < day["asr"] && now > day["dhuhr"]) {
    comingPrayer = day["asr"];
  }
  if (now < day["maghrib"] && now > day["asr"]) {
    comingPrayer = day["maghrib"];
  }
  if (now < day["isha"] && now > day["maghrib"]) {
    comingPrayer = day["isha"];
  }
  if ((now < day["fajrTmrw"] && now > day["isha"]) || now < day["fajr"]) {
    comingPrayer = day["fajrTmrw"];
  }
  return comingPrayer;
};

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
