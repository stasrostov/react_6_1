import { useState } from 'react';
import Clock from './components/Clock/Clock.jsx';
import './App.css';

function App() {
  const [clocks, setClocks] = useState([]);
  const [city, setCity] = useState('');
  const [timezone, setTimezone] = useState('');

  const addClock = () => {
    if (city && timezone !== '') {
      setClocks([...clocks, { city, timezone: parseInt(timezone) }]);
      setCity('');
      setTimezone('');
    }
  };

  const removeClock = (index) => {
    setClocks(clocks.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>Мировые часы</h1>
      <div className="form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Название"
        />
        <input
          type="number"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          placeholder="Временная зона"
        />
        <button onClick={addClock}>Добавить</button>
      </div>
      <div id="clocks">
        {clocks.map((clock, index) => (
          <Clock
            key={index}
            city={clock.city}
            timezone={clock.timezone}
            onRemove={() => removeClock(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
