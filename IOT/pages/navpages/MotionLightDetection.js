import {View, Text} from 'react-native';
import React, {useState} from 'react';
import MQTT from 'sp-react-native-mqtt';

export default function MotionLightDetection() {
  const [Type, setType] = useState('');

  MQTT.createClient({
    uri: 'mqtt://192.168.1.14:1883',
    clientId: 'your_client_id',
  })
    .then(function (client) {
      client.on('connect', function () {
        console.log('connected');

        client.subscribe('Models/Detection/Green_LED', 0);
      });
      client.on('message', function (msg) {
        console.log(msg.data);
        setType(msg.data);
      });

      client.connect();
    })
    .catch(function (err) {
      console.log(err);
    });

  return (
    <View>
      <Text>Motion Light Detection</Text>
      <Text>{Type}</Text>
    </View>
  );
}
