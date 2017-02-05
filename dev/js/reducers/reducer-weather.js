export default function (state = [], action) {
  switch (action.type) {

    case 'ADD_NEW_WEATHER':
      let stateReduced = removeItem(state, action);
      let newWeather = Object.assign({}, action.payload, {id: stateReduced.length ? stateReduced[0].id + 1 : 1});
      return [newWeather, ...stateReduced];

    case 'REMOVE_WEATHER':
      return removeItem(state, action);

    default:
      return state;
  }
}

const removeItem = (state, action) => {
  let newState = [];
  state.forEach((stateItem)=>{
    if (stateItem.coord !== action.payload.coord){
      newState.push(stateItem);
    }
  });
  return newState;
};
