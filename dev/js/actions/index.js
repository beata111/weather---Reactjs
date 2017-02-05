export const addNewWeather = (data) => {

    console.log('ddddddd',data);
    return {
      type: 'ADD_NEW_WEATHER',
      payload: {
        city: 'new'
      }
    }
};
export const removeWeather = (id) => {
    return {
      type: 'REMOVE_WEATHER',
      payload: {
        id: id
      }
    }
};
export const moveWeatherUp = (id) => {
    return {
      type: 'MOVE_WEATHER_UP',
      payload: {
        id: id
      }
    }
};
export const changeInputType = (type) => {

    console.log(type);
    if (type === 'city') {
        return {
            type: 'SET_INPUT_TYPE_TO_CITY',
            payload: null
        }
    } else if (type === 'coordinates') {
        return {
            type: 'SET_INPUT_TYPE_TO_COORDINATES',
            payload: null
        }
    }
};
