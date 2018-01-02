import React, {Component} from 'react';
import { Container, Statistic, Segment } from 'semantic-ui-react'

class Performance extends Component {
  constructor(props) {super(props)}

  render(){
    return(
      <Container text style={styles}>
        <Segment>
          <div>
            <Statistic.Group color='red' size='small' widths='four'>
              <Statistic>
                <Statistic.Value>{this.props.wins}</Statistic.Value>
                <Statistic.Label>Win/Loss</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{this.props.kills}</Statistic.Value>
                <Statistic.Label>kills</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{this.props.deaths}</Statistic.Value>
                <Statistic.Label>Deaths</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{this.props.assists}</Statistic.Value>
                <Statistic.Label>Assists</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </div>
        </Segment>
      </Container>
    )
  }
}

const styles = {
  marginTop: 10,
};

export default Performance