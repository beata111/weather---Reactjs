import * as actions from '../../actions';

describe('actions', () => {
    it('returns "ADD_NEW_WEATHER"', () => {
        const data = {data: 'data'};
        const expectedAction = {
            type: 'ADD_NEW_WEATHER',
            payload: data
        };
        expect(actions.addNewWeather(data)).toEqual(expectedAction)
    });

    it('returns "REMOVE_WEATHER"', () => {
        const data = {data: 'data'};
        const expectedAction = {
            type: 'REMOVE_WEATHER',
            payload: data
        };
        expect(actions.removeWeather(data)).toEqual(expectedAction)
    });

    it('returns "SET_ERROR_MESSAGE"', () => {
        const data = {data: 'data'};
        const expectedAction = {
            type: 'SET_ERROR_MESSAGE',
            payload: data
        };
        expect(actions.setErrorMessage(data)).toEqual(expectedAction)
    });

    it('returns "REMOVE_ERROR_MESSAGE"', () => {
        const data = {data: 'data'};
        const expectedAction = {
            type: 'REMOVE_ERROR_MESSAGE',
            payload: null
        };
        expect(actions.removeErrorMessage(data)).toEqual(expectedAction)
    });

    it('returns "SET_INPUT_TYPE_TO_CITY"', () => {
        const expectedAction = {
            type: 'SET_INPUT_TYPE_TO_CITY',
            payload: null
        };
        expect(actions.changeInputType('city')).toEqual(expectedAction)
    });

    it('returns "SET_INPUT_TYPE_TO_COORDINATES"', () => {
        const expectedAction = {
            type: 'SET_INPUT_TYPE_TO_COORDINATES',
            payload: null
        };
        expect(actions.changeInputType('coordinates')).toEqual(expectedAction)
    });

});