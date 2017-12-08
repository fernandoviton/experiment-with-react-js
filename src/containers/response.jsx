import { connect } from 'react-redux';
import JsonViewer from '../components/jsonViewer';
import { setFetchResponse } from '../actions';
import makeGetRequest from './makeGetRequest';

const mapStateToProps = state => ({
    json: state.responseData
});

const mapDispatchToProps = dispatch => ({
    onClickItem: itemName => {
        // TODO: move to middleware
        makeGetRequest(itemName, response => {
            const responseData = response.content || `StatusCode: ${response.statusCode}, click to retry`;
            dispatch(setFetchResponse(itemName, responseData));
        })
    }
});

const Response = connect(
    mapStateToProps,
    mapDispatchToProps
)(JsonViewer);

export default Response;