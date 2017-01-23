/* global window */
window.navigator.userAgent = 'ReactNative'; // this seems to be necessary for debugging, according to article
const io = require('socket.io-client'); // this is using require and not import on purpose, so the first line happens before

export default class {
  constructor(onStateCallback) {
    this._socket = io('http://localhost:1338', {
      transports: ['websocket'] // you need to explicitly tell it to use websockets, according to article
    });

    this._socket.on('connect', () => {
      console.log('connected!');
    });

    this._socket.on('state', (id, state) => {
      onStateCallback(id, state);
    });
  }

  sendState(state) {
    this._socket.emit('state', state);
  }
}

// Article about socket.io on react-native => https://medium.com/@ekryski/how-to-actually-use-socket-io-in-react-native-39082d8d6172#.8fas6un56
