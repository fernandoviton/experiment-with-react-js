import initialState from './initialState';

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FETCH_RESPONSE':
            // TODO: immutable js
            return {...state, responseData: { ...state.responseData, [action.topLevelPath]: action.response }};
        case 'LOAD_CONFIG':
            if (action.config.baseUrl === undefined)
                return {...state, error: 'Configuration error: invalid baseUrl'};
            if (action.config.topLevelPaths === undefined || action.config.topLevelPaths.size === 0)
                return {...state, error: 'Configuration error: invalid topLevelPaths'};
            return {
                ...state,
                error: undefined,
                webRequestInfo: {
                    baseUrl: action.config.baseUrl,
                    topLevelPaths: action.config.topLevelPaths
                },
                responseData: [...action.config.topLevelPaths].reduce((aggregate, dataValue) => ({...aggregate, [dataValue]:'click to load'}), {})};
        default:
            return state;
    }
};