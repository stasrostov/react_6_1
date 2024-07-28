import { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';

const Clock = ({ city, timezone, onRemove }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = moment().utcOffset(timezone);
      setTime(now.format('HH:mm:ss'));
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId);
  }, [timezone]);

  return (
    <div className="clock">
      <div className="clock-info">{city}</div>
      <div className="clock-time">{time}</div>
      <button onClick={onRemove}>&times;</button>
    </div>
  );
};

Clock.propTypes = {
  city: PropTypes.string.isRequired,
  timezone: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Clock;
