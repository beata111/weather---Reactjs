var defaultState =  {
  inputType: 'city',
};


export default function (state = defaultState, action) {
  switch (action.type) {
    case 'SET_INPUT_TYPE_TO_CITY':
      var newState = Object.assign({}, state, {inputType: 'city'});
      return newState;
    case 'SET_INPUT_TYPE_TO_COORDINATES':
      var newState = Object.assign({}, state, {inputType: 'coordinates'});
      return newState;
    default:
      return state;
  }
}
