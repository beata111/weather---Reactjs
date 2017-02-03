import {combineReducers} from 'redux';
import WeatherReducer from './reducer-weather';
import weatherPanelReducer from './reducer-weather-panel';

const allReducers = combineReducers({
  weather: WeatherReducer,
  weatherPanel: weatherPanelReducer,
});

export default allReducers
