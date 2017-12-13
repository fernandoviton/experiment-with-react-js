import { connect } from 'react-redux';
import JsonList from '../components/jsonList';
import { fetchData } from '../actions';

const mapStateToProps = state => {
    return {
    responseData: state.responseData
}};

const mapDispatchToProps = dispatch => ({
    onClickItem: itemName => dispatch(fetchData(itemName))
});

const ResponseList = connect(
    mapStateToProps,
    mapDispatchToProps
)(JsonList);

export default ResponseList;