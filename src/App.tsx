import React, { useState, useEffect } from "react";

import { FaMoon, FaSun } from "react-icons/fa6";

import "./App.scss";

interface Time {
  hour: string;
  min: string;
  sec: string;
  amPm: string;
}

const App: React.FC = () => {
  const [isDarkMode, setDarkMode] = useState<boolean>(false);
  const [time, setTime] = useState<Time>({
    hour: "08",
    min: "45",
    sec: "06",
    amPm: "AM",
  });

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const timeString = date.toLocaleTimeString("en-US", {
        hour12: true,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });

      const [timePart, amPm] = timeString.split(" ");

      const [hour, min, sec] = timePart.split(":");

      setTime({
        hour: hour,
        min: min,
        sec: sec,
        amPm: amPm.toUpperCase(),
      });
    };

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className={isDarkMode ? "dark" : ""}>
      <div className="container">
        <div className="icons" onClick={toggleDarkMode}>
          <i className={`fas fa-moon ${isDarkMode ? "dark" : ""}`}>
            <FaMoon />
          </i>
          <i className={`fas fa-sun ${isDarkMode ? "dark" : ""}`}>
            <FaSun />
          </i>
        </div>
        <div className="time">
          <div className="time-colon">
            <div className="time-text">
              <span className="num hour_num">{time.hour}</span>
              <span className="text">Hours</span>
            </div>
            <span className="colon">:</span>
          </div>
          <div className="time-colon">
            <div className="time-text">
              <span className="num min_num">{time.min}</span>
              <span className="text">Minutes</span>
            </div>
            <span className="colon">:</span>
          </div>
          <div className="time-colon">
            <div className="time-text">
              <span className="num sec_num">{time.sec}</span>
              <span className="text">Seconds</span>
            </div>
            <span className="am_pm">{time.amPm}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
