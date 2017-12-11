import { connect } from 'react-redux';
import JsonViewer from '../components/jsonViewer';
import { fetchData } from '../actions';

const mapStateToProps = state => ({
    json: state.responseData
});

const mapDispatchToProps = dispatch => ({
    onClickItem: itemName => dispatch(fetchData(itemName))
});

const Response = connect(
    mapStateToProps,
    mapDispatchToProps
)(JsonViewer);

export default Response;