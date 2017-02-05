var defaultState =  {
  inputType: 'city',
  errorMessage: ''
};

export default function (state = defaultState, action) {
  switch (action.type) {

    case 'SET_INPUT_TYPE_TO_CITY':
      var newState = Object.assign({}, state, {inputType: 'city', errorMessage: ''});
      return newState;

    case 'SET_INPUT_TYPE_TO_COORDINATES':
      var newState = Object.assign({}, state, {inputType: 'coordinates', errorMessage: ''});
      return newState;

    case 'SET_ERROR_MESSAGE':
      var newState = Object.assign({}, state, {errorMessage: action.payload});
      return newState;

    case 'REMOVE_ERROR_MESSAGE':
      var newState = Object.assign({}, state, {errorMessage: ''});
      return newState;

    default:
      return state;
  }
}










