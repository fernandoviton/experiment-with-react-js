import React from 'react'
import PropTypes from 'prop-types'
import JSONTree from 'react-json-tree';

const JsonViewer = ({ name, json }) => (
    <JSONTree
        hideRoot={true}
        data={json}
        getItemString={(type, data, itemType, itemString) =>
        <span>{data.name}</span>}/>
);

JsonViewer.propTypes = {
    name: PropTypes.string.isRequired,
    json: PropTypes.object.isRequired,
}

export default JsonViewer;