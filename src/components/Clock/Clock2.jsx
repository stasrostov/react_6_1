import { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import './Clock2.css';

const Clock2 = ({ city, timezone, onRemove }) => {
  const [time, setTime] = useState(moment().utcOffset(timezone));

  useEffect(() => {
    const tick = () => {
      const now = moment().utcOffset(timezone);
      setTime(now);
    };

    tick();
    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, [timezone]);

  const seconds = time.seconds();
  const minutes = time.minutes();
  const hours = time.hours() % 12;

  const secondsDeg = (seconds / 60) * 360;
  const minutesDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hoursDeg = (hours / 12) * 360 + (minutes / 60) * 30;

  const formattedTime = time.format('HH:mm:ss');

  return (
    <div className="clock">
      <div className="clock-info">{city}</div>
      <div className="clock-face">
        <div className="hand hour-hand" style={{ transform: `rotate(${hoursDeg}deg)` }}></div>
        <div className="hand minute-hand" style={{ transform: `rotate(${minutesDeg}deg)` }}></div>
        <div className="hand second-hand" style={{ transform: `rotate(${secondsDeg}deg)` }}></div>
      </div>
      <div className="digital-clock">{formattedTime}</div>
      <button onClick={onRemove}>&times;</button>
    </div>
  );
};

Clock2.propTypes = {
  city: PropTypes.string.isRequired,
  timezone: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Clock2;
