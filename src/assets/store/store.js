import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "assets/features/counter/counterSlice.js";
import prayersReducer from "assets/features/Prayers/prayersSlice.js";

export default configureStore({
  reducer: {
    counter: counterReducer,
    prayers: prayersReducer,
  },
});
