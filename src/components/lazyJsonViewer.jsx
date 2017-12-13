import React from 'react'
import PropTypes from 'prop-types'
import JsonViewer from './jsonViewer'

const getLoadLabel = json =>
    json ? 'reload' : 'load';

const LazyJsonViewer = ({ name, json, onClickItem }) => (
    <div>
        <h2>{name}</h2>
        {typeof json === 'object' && <JsonViewer name={name} json={json}/>}
        {typeof json === 'string' && <label>{json}</label>}
        {<button onClick={() => onClickItem(name)}>{getLoadLabel(json)}</button>}
    </div>
);

LazyJsonViewer.propTypes = {
    name: PropTypes.string.isRequired,
    json: PropTypes.any,
    onClickItem: PropTypes.func.isRequired,
}

export default LazyJsonViewer;