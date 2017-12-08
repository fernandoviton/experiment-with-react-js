import React from 'react'
import PropTypes from 'prop-types'
import JsonView from 'react-json-view';
import JSONTree from 'react-json-tree';

const JsonViewer = ({ json, onClickItem }) => (
    <div>
        <JsonView
            src={json}
            collapsed={true}
            displayDataTypes={false}
            onSelect={item => {
                onClickItem(item.name);
            }}
        />
        <JSONTree
          data={json}
          getItemString={(type, data, itemType, itemString) =>
            <span>{data.name}</span>}/>
    </div>
);

JsonViewer.propTypes = {
    json: PropTypes.object.isRequired,
    onClickItem: PropTypes.func.isRequired,
}

export default JsonViewer;