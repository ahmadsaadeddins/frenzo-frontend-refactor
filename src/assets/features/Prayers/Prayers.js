import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsync, prayerCard, comingPrayer } from "./prayersSlice";
import PrayerCard from "./PrayerCard";
import useRemaining from "../hooks/useRemaining";

export default function Prayers() {
  const dispatch = useDispatch();

  const prayers = useSelector(prayerCard);
  const nextPrayer = useSelector(comingPrayer);
  const remainingToPrayer = useRemaining(nextPrayer);

  React.useEffect(() => {
    dispatch(fetchAsync("http://127.0.0.1:8001/mozn/api/today"));
  }, [dispatch]);

  return <PrayerCard prayers={prayers} remainingToPrayer={remainingToPrayer} />;
}
