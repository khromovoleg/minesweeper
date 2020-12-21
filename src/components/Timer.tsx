import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

import { actions } from "store/actions";

interface MyProps {
  play: boolean;
  times: any;
}

const Timer: React.FC<MyProps> = ({ play, times }: MyProps) => {
  //const [time, setTime] = useState(0);
  const dispatch = useDispatch();
  let intervalId: any = null;

  useEffect(() => {
    if (play) {
      intervalId = setInterval(() => {
        dispatch(actions.GAME.UPDATED_TIMES(times + 1));
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [play, times]);

  const timeFormat = (times: any) => {
    let seconds: any = times;
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

  return <>{timeFormat(times)}</>;
};

export default Timer;
