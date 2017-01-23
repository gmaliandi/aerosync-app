/* global navigator */

import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, Alert} from 'react-native';
import MapView from 'react-native-maps';
import Sync from '../services/syncService';

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

const LATITUDE = -34.61138844;
const LONGITUDE = -58.42087009;

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
      markers: {}
    };

    this._sync = new Sync((id, plane) => this.onRemoteLocation(id, plane));
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => this.onLocalPosition(position),
      (error) => Alert.alert('Error', error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => this.onLocalPosition(position));

    this._interval = setInterval(() => this.forceUpdate(), 1000);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
    clearInterval(this._interval);
  }

  onLocalPosition(position) {
    console.log('my position', position);

    const newRegion = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };
    this.onRegionChange(newRegion);
    this._sync.sendState(position.coords);
  }

  onRegionChange(region) {
    this.setState({region});
  }

  onRemoteLocation(id, plane) {
    let marker = {
      latlng: {
        latitude: plane.latitude,
        longitude: plane.longitude
      },
      title: id,
      speed: plane.speed,
      heading: plane.heading,
      altitude: plane.altitude,
      accuracy: plane.accuracy,
      timestamp: Date.now()
    };

    this.setState({
      markers: {...this.state.markers, id: marker}
    });
  }

  render() {
    return (
      <View style ={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={() => this.onRegionChange()}>
            {Object.values(this.state.markers).map(marker => (
              <MapView.Marker
                key={`${marker.latlng.latitude}${marker.latlng.longitude}`}
                coordinate={marker.latlng}
                title={`${marker.title} (${((Date.now() - marker.timestamp) / 1000).toFixed(0)}s)`}
                description={`Speed: ${marker.speed}, Heading: ${marker.heading}, Altitude: ${marker.altitude}, Accuracy: ${marker.accuracy}`}
                image={require('../../assets/plane.png')}
              />
            ))}
       </MapView>
     </View>
    );
  }
}

export default Aeromap;
