/* global navigator */

import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, Alert} from 'react-native';
import MapView from 'react-native-maps';

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

// (Initial Static Location) Mumbai
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
        latlng: {latitude: 37.78825, longitude: -122.4324},
        title: 'Nicanor',
        description: 'Precaucion: suele despegar por la cabecera equivocada'
      }]
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        });
      },
      (error) => Alert.alert('Error', error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      const newRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };

      this.onRegionChange(newRegion);
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onRegionChange(region) {
    this.setState({ region });
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
