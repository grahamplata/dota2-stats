import React from 'react';
import { Container, Segment, Image } from 'semantic-ui-react'

const Footer = () => (
  <div>
    <Container text style={styles}>
      <Segment textAlign='center'>
        <p>Crafted by @grahamplata on Codesandbox.io with React</p>
      </Segment>
    </Container>
  </div>
);


const styles = {
  marginTop: 10,
  marginBottom: 10
};

export default Footer