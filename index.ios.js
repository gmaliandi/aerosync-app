// TODO follow installation instructions for iOS => https://github.com/airbnb/react-native-maps/blob/master/docs/installation.md


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Aeromap from './js/components/aeromap';

export default class aerosync extends Component {
  render() {
    return (
      <Aeromap />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('aerosync', () => aerosync);
