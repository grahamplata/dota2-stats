import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'

class Todo extends Component {
  render() {
    return (
      <Segment>
        <h1>Todos</h1>
        <ul>
          <li>Add a generated loss excuse</li>
          <li>Add Search</li>
          <li>Add More Detail on match selection</li>
          <li><strike>Add Averages</strike><small> Completed: Sept 18, 2017</small></li>
        </ul>
      </Segment>
    );
  }
}

export default Todo