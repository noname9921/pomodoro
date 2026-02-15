import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import StartButton from "./StartButton";

type Current =
  | "work"
  | "shortBreak"
  | "longBreak";

function renderTime(time: number): string {
  const minute = Math.floor(time / 60);
  const second = time % 60;

  return `${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
}

function getTimerInit(curr: Current): number {
  switch (curr) {
    case "work":
      return 1800;
    case "shortBreak":
      return 300;
    case "longBreak":
      return 900;
  }
}



export default function Timer() {
  const [curr, setCurr] = useState<Current>("work");
  const [timer, changeTimer] = useState(getTimerInit(curr));
  const [running, setRunning] = useState(false);
  const [breakCounter, setBreakCounter] = useState(0)

  const timerInit = getTimerInit(curr);
  const elapsed = timerInit - timer;
  const percentage = (elapsed / timerInit) * 100;

  function handleSessionChange() {
  if (curr === "work") {
    const nextBreakCount = breakCounter + 1;

    if (nextBreakCount === 3) {
      setBreakCounter(0);
      setCurr("longBreak");
      changeTimer(getTimerInit("longBreak"));
    } else {
      setBreakCounter(nextBreakCount);
      setCurr("shortBreak");
      changeTimer(getTimerInit("shortBreak"));
    }
  } else {
    setCurr("work");
    changeTimer(getTimerInit("work"));
  }
}



  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      changeTimer((prev) => {
        if (prev > 1) return prev - 1

        handleSessionChange()
        return prev
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [curr, running, breakCounter]);

  return (
    <div id="timer">
      <CircularProgressbar
        value={percentage}
        text={renderTime(timer)}
        styles={buildStyles({
          pathColor: "#4f46e5",
          trailColor: "rgba(79,70,229,0.2)",
          textColor: "#f8fafc",
          textSize: "18px",
          strokeLinecap: "round",
        })}
      />

      <h3>{curr === 'work'
        ? 'Work'
        : curr === 'shortBreak'
        ? 'Short Break'
        : 'Long Break'
      }</h3>

      <StartButton
        onStart={() => setRunning(!running)}
        content={running ? "Stop" : "Start"}
      />
    </div>
  );
}
