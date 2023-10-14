import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import MQTT from 'sp-react-native-mqtt';

export default function MotionLightDetection() {
  const [Type, setType] = useState('');
  const [Type1, setType1] = useState('');

  useEffect(() => {
    MQTT.createClient({
      uri: 'mqtt://192.168.199.16:1883',
      clientId: 'your_client_id_1',
    })
      .then(function (client1) {
        console.log('called');
        client1.on('connect', function () {
          console.log('connected');

          client1.subscribe('Models/Detection/Type', 0);
          client1.subscribe('Models/Detection/Sensor', 0);
        });
        client1.on('message', function (msg) {
          if (msg.topic == 'Models/Detection/Type') {
            console.log('Switch called:', msg.data);
          }
          if (msg.topic == 'Models/Detection/Sensor') {
            console.log('human: ', msg.data);
          }
        });

        client1.connect();
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <View>
      <Text>Motion Light Detection</Text>
      <Text>{Type}</Text>
      <Text>{Type1}</Text>
    </View>
  );
}
