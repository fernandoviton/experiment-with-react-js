import fetchData from '../helpers/fetchData';
import toMiddleware from './toMiddleware';
import { setFetchResponse } from '../actions';

const webRequest = (oldState, newState, dispatch, action) => {
    switch (action.type) {
        case 'FETCH_DATA':
            // TODO: switch to use promise
            fetchData(oldState.get('webRequestInfo').toJS(), action.name, response => {
                const responseData = response.content || `StatusCode: ${response.statusCode}`;
                dispatch(setFetchResponse(action.name, responseData));
            });
            break;
        default:
            break;
    }
}

export default toMiddleware(webRequest);