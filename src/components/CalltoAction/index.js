import React from 'react';
import { Container, Header, Segment, Image } from 'semantic-ui-react'
const CalltoAction = () => (
  <div>
    <Container text style={styles}>
      <Segment>
        <Image src='https://seeklogo.com/images/D/dota-2-logo-A8CAC9B4C9-seeklogo.com.png' size='tiny' floated='right' />
        <Header as='h1'>DotA Stats</Header>
        <Header as='h4'>Dynamically track your progress</Header>
        <p>Welcome to "DotA Stats" this is a personal project that I come back to when I am seeking to learn a new libary.</p>
      </Segment>
    </Container>
  </div>
);

const styles = {
  marginTop: 10
};

export default CalltoAction