import root from './root';
import * as Actions from '../actions';


const defaultState = { foo: 'bar' };

describe('Root reducer', () => {
    it ('with unknown action returns input state', () => {
        expect(root('some state', 'some action')).toEqual('some state');
    });

    it ('setFetchResponse with no previous response sets response data', () => {
        expect(root(defaultState, Actions.setFetchResponse('somePath', 'a response'))).toEqual(
            {...defaultState,
                responseData: {somePath: 'a response' }
            });
    });

    it ('setFetchResponse with different previous response adds response data', () => {
        const initialResponseData = {somePreexistingPath: 'some preexisting data'};
        const initialState = {...defaultState, responseData: initialResponseData};
        expect(root(initialState, Actions.setFetchResponse('somePath', 'a response'))).toEqual(
            {...initialState,
                responseData: { ...initialState.responseData, somePath: 'a response' }
            });
    });

    it ('setFetchResponse with same previous response replaces response data', () => {
        const initialResponseData = {somePreexistingPath: 'some preexisting data'};
        const initialState = {...defaultState, responseData: initialResponseData};
        expect(root(initialState, Actions.setFetchResponse('somePreexistingPath', 'new data'))).toEqual(
            {...initialState,
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
        const config = { baseUrl: 'testUrl', topLevelPaths: new Set(['a', 'b']) };
        expect(root({...defaultState, error: 'pretest error'}, Actions.loadConfig(config))).toEqual(
            { ...defaultState,
                error: undefined,
                webRequestInfo: {
                    baseUrl: 'testUrl',
                    topLevelPaths: new Set(['a', 'b'])
                },
                responseData: { a: 'click to load', b: 'click to load' }
        });
    });
});