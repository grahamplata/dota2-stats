import React, { Component } from 'react';
import { render } from 'react-dom';
import { Segment, Input, Grid } from 'semantic-ui-react'

class AppHeader extends Component {
  render() {
    return (
      <Segment>
        < Grid>
          <Grid.Row columns={2} >
            <Grid.Column>
              <h1 href="https://steamcommunity.com/id/grahamplata/">Graham's (Voigtländer)<small> Recent Games...</small></h1>
            </Grid.Column>
          </Grid.Row>
        </Grid >
      </Segment>
    );
  }
}

export default AppHeader