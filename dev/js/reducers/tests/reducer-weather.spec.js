import reducer from '../../reducers/reducer-weather'

describe('reducer-weather', () => {
  it('returns initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual([])
  });

  it('handles ADD_NEW_WEATHER', () => {
    expect(
      reducer([], {
        type: 'ADD_NEW_WEATHER',
        payload: {test: 'test'}
      })
    ).toEqual([{id: 0, test: 'test'}]);
  });

  it('handles REMOVE_WEATHER', () => {
    expect(
      reducer([{id: 0, coord: 'coord1'},
               {id: 1, coord: 'coord2'}
               ],
               {type: 'REMOVE_WEATHER',
                payload: {id: 1, coord: 'coord2'}
               })
    ).toEqual([{id: 0, coord: 'coord1'}]);
  });
});