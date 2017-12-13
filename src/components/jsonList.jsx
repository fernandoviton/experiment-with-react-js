import React from 'react'
import PropTypes from 'prop-types'
import LazyJsonViewer from './lazyJsonViewer'

const getJsonViewer = (name, response, onClickItem) => {
    return <LazyJsonViewer
        name={name}
        json={response || undefined}
        onClickItem={onClickItem}
        key={name}
/>};

const JsonList = ({ responseData, onClickItem }) => (
    <div>
        {responseData.entrySeq().map(([key,value]) => getJsonViewer(key, value, onClickItem))}
    </div>
);

JsonList.propTypes = {
    responseData: PropTypes.object.isRequired, // immutable map
    onClickItem: PropTypes.func.isRequired,
}

export default JsonList;