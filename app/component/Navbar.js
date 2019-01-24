import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon } from 'native-base';
export default class Navbar extends Component {
  render() {
    return(
      <Header
        style={{backgroundColor: "#475766"}}
        backgroundColor="#5a3e42"
        noShadow={true}
        >
        {this.props.left ? this.props.left : <Left style={{flex: 1}} />}
        <Body style={styles.body}>
          <Title style={styles.title}>{this.props.title}</Title>
        </Body>
        {this.props.right ? this.props.right : <Right style={{flex: 1,color:"#FFFFF"}} />}
      </Header>
    );
  }
}

const styles={
  body: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',


  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: '100',
    color : 'white',
    fontSize: 20,


  }
};
