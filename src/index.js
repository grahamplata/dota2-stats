import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container, Segment } from 'semantic-ui-react'

// Custom Components
import Results from './components/Results'
import Todo from './components/Todo'
import AppHeader from './components/AppHeader'

// Styles
import 'semantic-ui-css/semantic.min.css';
import './stylesheets/dota2minimapheroes.css';
import './stylesheets/styles.css';

class App extends Component {
  render() {
    return (
      <div>
        <Container className="wrapper">
          <AppHeader />
          <Segment>
            <Results />
          </Segment>
          <Todo />
        </Container>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
