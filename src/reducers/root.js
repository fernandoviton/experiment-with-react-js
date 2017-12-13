import getInitialState from './getInitialState';
import immutable from 'immutable';

export default (state = getInitialState(), action) => {

    // TODO: once we adopt immutable 4.x we can add something like this
    // to help catch if folks accidentally return a non immutable
    // if (!immutable.isImmutable(state))
    //    throw 'not immutable';

    switch (action.type) {
        case 'SET_FETCH_RESPONSE':
            // TODO: change responseData to be a record of json responses based on topLevelPaths
            return state.set('responseData', state.responseData.set(action.topLevelPath, immutable.fromJS(action.response)));
        case 'LOAD_CONFIG':
            if (action.config.baseUrl === undefined)
                return state.set('error', 'Configuration error: invalid baseUrl');
            if (action.config.topLevelPaths === undefined || action.config.topLevelPaths.size === 0)
                return state.set('error', 'Configuration error: invalid topLevelPaths');
            return state.withMutations(s => s
                .set('error', undefined)
                .set('webRequestInfo', immutable.fromJS(action.config))
                .set('responseData', immutable.fromJS(
                    [...action.config.topLevelPaths].reduce((aggregate, dataValue) => ({...aggregate, [dataValue]:undefined}), {})))
                );
        default:
            return state;
    }
};