import socketio from 'socket.io-client';

const socket = socketio('http://192.168.2.55:3333', {
    autoConnect: false,
});

function connect(latitude, longitude, techs) {
    socket.io.opts.query = {latitude, longitude, techs}
    socket.connect();
}

function disconnect() {
    if (socket.connected) {
        socket.disconnect();
    }
}

function subscribeToNewDev(subscriptionFunction) {
    socket.on('new-dev', subscriptionFunction)
}


export {
    connect,
    disconnect,
    subscribeToNewDev,
}
