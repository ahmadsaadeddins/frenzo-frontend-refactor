import { convertTimeToDateTime } from "../helpers/time";

// Helpers
export const PRAYER_NAMES = [
  "fajr",
  "sunrise",
  "dhuhr",
  "asr",
  "maghrib",
  "isha",
];

export const prayerTimesToDate = (today, tomorrow, prayerNames) =>
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

export const nextPrayer = (day) => {
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
