import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import nodeRestClient from 'node-rest-client';
import JSONTree from 'react-json-tree';
import JsonView from 'react-json-view';
import { getdataNames, rootUrl } from './config';
import odata from 'odata';

const lastInArray = (arr) => arr.length === 0 ? undefined : arr[arr.length - 1];

const fetchData = (client, name, reactComponent) => {
  var args = {}

  if (!getdataNames.has(name))
    return;

  //client.get(`${rootUrl}/${name}`, args,
  //  (data, response) => {
    odata(`${rootUrl}/${name}`).get()
    .then( (result) => {
      const data = result.data;
      const response = result.response;
      console.log(`requested ${name}`, result.first());
      const state = reactComponent.state;
      reactComponent.setState({
        data: {...state.data, [name]: data},
        response: {statusCode: 'OK'}});
    })
    .fail(info => {
      console.log('failed GET call', info);
      reactComponent.setState({response: {statusCode: info.status}});
    });
  }

class App extends Component {
  constructor(props) {
    super(props);
    const initialData = [...getdataNames].reduce((aggregate, dataValue) => ({...aggregate, [dataValue]:'click to load'}), {});
    console.log('initialData', initialData);
    this.state = {
      client: new nodeRestClient.Client(),
      response: {statusCode: 0},
      data: initialData
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button onClick={() => fetchData(this.state.client, this)}>Fetch!</button>
        <h1>{this.state.response.statusCode}</h1>
        <JsonView
          src={this.state.data}
          collapsed={true}
          displayDataTypes={false}
          onSelect={(select)=>{
            console.log('select', select);
            fetchData(this.state.client, select.name, this);
            }}
          onEdit={(edit)=>{
            console.log('edit', edit);
            return false;
            }}/>
        <JSONTree
          data={this.state.data}
          getItemString={(type, data, itemType, itemString) =>
            <span>{data.name}</span>}/>
      </div>
    );
  }
}

export default App;
