/* global window */

window.navigator.userAgent = 'ReactNative';

let onStateCallback;
const io = require('socket.io-client');
const socket = io('http://localhost:1338', {
  transports: ['websocket'] // you need to explicitly tell it to use websockets
});

socket.on('connect', () => {
  console.log('connected!');
});

socket.on('state', state => {
  if(onStateCallback) {
    onStateCallback(state);
  }
});

export default {
  sendState(state) {
    socket.emit('state', state);
  },
  onState(callback) {
    onStateCallback = callback;
  }
};
