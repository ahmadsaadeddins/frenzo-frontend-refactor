import React from "react";

const remainingToNextPrayer = (next) => {
  if (next) {
    var distance = next - new Date();
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (minutes < "10" && hours > 0) {
      minutes = "0" + minutes;
    }
    if (seconds < "10" && minutes > 0) {
      seconds = "0" + seconds;
    }

    if (distance > 0) {
      if (hours > 0) {
        return `${hours}:${minutes}:${seconds}`;
      }
      return `${minutes}:${seconds}`;
    } else if (distance === 0) {
      return "حان وقت الصلاه";
    }
  } else {
    return next;
  }
};

const useRemaining = (comingPrayer) => {
  const [remainingToPrayer, setRemainingToPrayer] = React.useState("");

  React.useEffect(() => {
    const interval = setInterval(
      () => setRemainingToPrayer(remainingToNextPrayer(comingPrayer)),
      1000
    );
    return () => clearInterval(interval);
  }, [comingPrayer]);

  return remainingToPrayer;
};

export default useRemaining;
