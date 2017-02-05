export const addNewWeather = (data) => {
    console.log(data);
    return {
      type: 'ADD_NEW_WEATHER',
      payload: data
    }
};
export const removeWeather = (data) => {
    return {
      type: 'REMOVE_WEATHER',
      payload: data
    }
};
export const setErrorMessage = (message) => {
    return {
      type: 'SET_ERROR_MESSAGE',
      payload: {
        message: message
      }
    }
};
export const removeErrorMessage = () => {
    return {
        type: 'REMOVE_ERROR_MESSAGE',
        payload: null
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
