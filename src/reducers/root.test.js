import immutable from 'immutable';
import root from './root';
import * as Actions from '../actions';
import getInitalState from '../reducers/getInitialState';


const defaultState = getInitalState();
const defaultStateJs = defaultState.toJS();

const makeStateWithResponseData = (responseDataKey, responseDataValue) =>
    defaultState.set('responseData', defaultState.responseData.set(responseDataKey, responseDataValue));

describe('Root reducer', () => {
    it ('with unknown action returns input state', () => {
        expect(root('some state', 'some action')).toEqual('some state');
    });

    it ('setFetchResponse with no previous response sets response data', () => {
        expect(root(defaultState, Actions.setFetchResponse('somePath', 'a response')).toJS())
            .toEqual({
                ...defaultStateJs,
                responseData: {somePath: 'a response' }
            });
    });

    it ('setFetchResponse with different previous response adds response data', () => {
        const initialState = makeStateWithResponseData('somePreexistingPath', 'some preexisting data');
        const initialStateJs = initialState.toJS();
        expect(root(initialState, Actions.setFetchResponse('somePath', 'a response')).toJS())
            .toEqual({
                ...initialStateJs,
                responseData: { ...initialStateJs.responseData, somePath: 'a response' }
            });
    });

    it ('setFetchResponse with same previous response replaces response data', () => {
        const initialState = makeStateWithResponseData('somePreexistingPath', 'some preexisting data');
        const initialStateJs = initialState.toJS();
        expect(root(initialState, Actions.setFetchResponse('somePreexistingPath', 'new data')).toJS())
            .toEqual({
                ...initialStateJs,
                responseData: { somePreexistingPath: 'new data' }
            });
    });

    it ('loadConfig with no baseUrl sets error', () => {
        const config = { topLevelPaths: new Set(['a', 'b']) };
        expect(root(defaultState, Actions.loadConfig(config)).error).not.toBeUndefined();
    });

    it ('loadConfig with no topLevelPaths sets error', () => {
        const config = { baseUrl: 'testUrl' };
        expect(root(defaultState, Actions.loadConfig(config)).error).not.toBeUndefined();
    });

    it ('loadConfig with empty topLevelPaths sets error', () => {
        const config = { baseUrl: 'testUrl', topLevelPaths: new Set([]) };
        expect(root(defaultState, Actions.loadConfig(config)).error).not.toBeUndefined();
    });

    it ('loadConfig with valid config sets webRequestInfo, responseData, and clears error', () => {
        const config = { someOtherProperty: 'somethingElse', baseUrl: 'testUrl', topLevelPaths: new Set(['a', 'b']) };
        expect(root(defaultState.set('error', 'pretest error'), Actions.loadConfig(config)).toJS())
            .toEqual({
                ...defaultStateJs,
                error: undefined,
                webRequestInfo: config,
                responseData: { a: undefined, b: undefined }
        });
    });
});