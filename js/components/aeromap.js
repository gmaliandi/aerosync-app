import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
});

// TODO take location from user http://stackoverflow.com/questions/38122649/how-to-create-maps-which-detect-automatic-location-in-react-native
class Aeromap extends Component {
  render() {
    return (
     <View style ={styles.container}>
       <MapView
         style={styles.map}
         region={{
           latitude: 61.187189,
           longitude: -149.829515,
           latitudeDelta: 0.004757,
           longitudeDelta: 0.006866,
         }}
       >
       </MapView>
     </View>
    );
  }
}

export default Aeromap;
