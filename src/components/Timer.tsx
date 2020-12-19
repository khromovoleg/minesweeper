import React, { useEffect, useState } from "react";

interface MyProps {
  timerWork: boolean;
}

const Timer: React.FC<MyProps> = ({ timerWork }: MyProps) => {
  const [time, setTime] = useState(0);
  let intervalId: any = null;

  useEffect(() => {
    if (timerWork) {
      intervalId = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [timerWork]);

  const timeFormat = (time: any) => {
    let seconds: any = time;
    let minutes: any = Math.floor(seconds / 60);
    let hours: any = "";

    if (minutes > 59) {
      hours = Math.floor(minutes / 60);
      minutes = minutes - hours * 60;
    }

    seconds = Math.floor(seconds % 60);

    hours = hours >= 10 ? hours : "0" + hours;
    minutes = minutes >= 10 ? minutes : "0" + minutes;
    seconds = seconds >= 10 ? seconds : "0" + seconds;

    return hours + ":" + minutes + ":" + seconds;
  };

  return <>{timeFormat(time)}</>;
};

export default Timer;
