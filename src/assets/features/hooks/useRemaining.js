import React from "react";
import { remainingTimeFromNow } from "../helpers/time";

const useRemaining = (comingPrayer) => {
  const [remainingToPrayer, setRemainingToPrayer] = React.useState("");

  React.useEffect(() => {
    const interval = setInterval(
      () =>
        setRemainingToPrayer(
          remainingTimeFromNow(comingPrayer, "حان وقت الصلاه")
        ),
      1000
    );
    return () => clearInterval(interval);
  }, [comingPrayer]);

  return remainingToPrayer;
};

export default useRemaining;
