import React, { Component } from 'react';
import { render } from 'react-dom';
import { Grid } from "semantic-ui-react";

//components
import CalltoAction from './components/CalltoAction'
import TableData from './components/TableData'
import Footer from './components/Footer'

class App extends Component {
  render() {
    return (
      <div>
        <CalltoAction />
        <TableData />
        <Footer />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));