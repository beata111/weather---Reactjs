import React from 'react';
import WeatherPanel from '../containers/weatherPanel';
require('../../scss/style.scss');

const App = () => (
  <div>
    <div className="container"><WeatherPanel/></div>
  </div>
);

export default App;
