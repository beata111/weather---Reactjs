import reducer from '../../reducers/reducer-weather-panel'

describe('reducer-weather-panel', () => {

  var defaultState;

  beforeEach(() => {
    defaultState = {
      inputType: 'city',
      errorMessage: ''
    };
  });

  it('returns initial state', () => {
    expect(
        reducer(undefined, {})
    ).toEqual(defaultState)
  });

  it('handles SET_INPUT_TYPE_TO_CITY', () => {
    expect(
      reducer({}, {
        type: 'SET_INPUT_TYPE_TO_CITY',
        payload: null
      })
    ).toEqual({inputType: 'city', errorMessage: ''});
  });

  it('handles SET_INPUT_TYPE_TO_COORDINATES', () => {
    expect(
      reducer(defaultState, {
        type: 'SET_INPUT_TYPE_TO_COORDINATES',
        payload: null
      })
    ).toEqual({inputType: 'coordinates', errorMessage: ''});
  });

  it('handles SET_ERROR_MESSAGE', () => {
    expect(
      reducer(defaultState,
        {type: 'SET_ERROR_MESSAGE',
         payload: 'error'})
    ).toEqual({inputType: 'city', errorMessage: 'error'});
  });
});