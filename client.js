import TcpSocket from 'react-native-tcp-socket';

const client = TcpSocket.createConnection({ port: 3600, host: '116.122.157.170' }, () => {
    console.log('연결됨!')
});

// client.setKeepAlive(true, 1)


export default client