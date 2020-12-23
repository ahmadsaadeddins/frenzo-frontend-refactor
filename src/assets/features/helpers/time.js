export const remainingTimeFromNow = (time, messageAfterComplete) => {
  if (time) {
    var distance = time - new Date();
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
      return messageAfterComplete;
    }
  } else {
    return time;
  }
};

export const convertTimeToDateTime = (time, extraDay = 0) => {
  const date = new Date();
  date.setHours(time.slice(0, 2));
  date.setMinutes(time.slice(3, 5));
  date.setSeconds(0);
  date.setDate(date.getDate() + extraDay);
  return date;
};
