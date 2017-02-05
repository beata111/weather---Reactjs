var defaultState = [
  {
    id: 1,
    city: 'city_1'
  }
];


export default function (state = defaultState, action) {
  switch (action.type) {
    case 'ADD_NEW_WEATHER':
      let newWeather = {
        id: state[state.length-1].id + 1,
        city: action.payload.city
      };
      return [...state, newWeather];
    case 'REMOVE_WEATHER':
      let newState = [];
      state.forEach((weather)=>{
        if (weather.id !== action.payload.id){
          newState.push(weather);
        }
      });
      return newState;
    case 'MOVE_WEATHER_UP': {
      let weatherPrioritized = [];
      let weatherNotPrioritized = [];
      state.forEach((weather)=>{
        if (weather.id !== action.payload.id){
          weatherNotPrioritized.push(weather);
        } else {
          weatherPrioritized.push(weather);
        }
      });
      return [...weatherPrioritized, ...weatherNotPrioritized];
    }
    default:
      return state;
  }
}
