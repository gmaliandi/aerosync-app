/* global navigator */

import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, Alert} from 'react-native';
import MapView from 'react-native-maps';
import sync from '../services/syncService';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
});

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Aeromap extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [{
        latlng: {latitude: LATITUDE, longitude: LONGITUDE},
        title: 'Nicanor',
        description: 'Precaucion: suele despegar por la cabecera equivocada'
      }]
    };
  }

  componentDidMount() {
    let onPosition = (position) => {
      const newRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };
      this.onRegionChange(newRegion);
      sync.sendState(position.coords);
    };

    navigator.geolocation.getCurrentPosition(
      onPosition,
      (error) => Alert.alert('Error', error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition(onPosition);

    sync.onState((state) => this.updateState(state));
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  updateState(state) {
    console.log('getting state', state);
  }

  render() {
    return (
      <View style ={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={() => this.onRegionChange()}>
            {this.state.markers.map(marker => (
              <MapView.Marker
                key={marker.latlng}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
                image={require('../../assets/plane.png')}
              />
            ))}
       </MapView>
     </View>
    );
  }
}

export default Aeromap;
