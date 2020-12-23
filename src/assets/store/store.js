import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "assets/features/counter/counterSlice.js";
import prayersReducer from "assets/features/Prayers/prayersSlice.js";
import devicesReducer from "assets/features/devices/devicesSlice.js";
// import gamesReducer from "assets/features/games/gamesSlice.js";

export default configureStore({
  reducer: {
    counter: counterReducer,
    prayers: prayersReducer,
    devices: devicesReducer,
    // games: gamesReducer,
  },
});
