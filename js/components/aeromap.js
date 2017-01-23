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
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markers: [{
        latlng: {latitude: 37.78825, longitude: -122.4324},
        title: 'Nicanor',
        description: 'Precaucion: suele despegar por la cabecera equivocada'
      }]
    };
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
          onRegionChange={this.onRegionChange}>
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
