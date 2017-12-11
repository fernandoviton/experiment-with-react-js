import fetchData from '../helpers/fetchData';
import toMiddleware from './toMiddleware';
import { setFetchResponse } from '../actions';

const webRequest = (oldState, newState, dispatch, action) => {
    switch (action.type) {
        case 'FETCH_DATA':
            // TODO: switch to use promise
            fetchData(oldState.webRequestInfo, action.name, response => {
                const responseData = response.content || `StatusCode: ${response.statusCode}, click to retry`;
                dispatch(setFetchResponse(action.name, responseData));
            });
            break;
        default:
            break;
    }
}

export default toMiddleware(webRequest);