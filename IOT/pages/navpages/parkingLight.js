import {View, Text} from 'react-native';
import React, {useState} from 'react';
import MQTT from 'sp-react-native-mqtt';
import { Button } from 'react-native';
export default function ParkingLight() {
  const [test, settest] = useState(null);
  const mqttClient = '';

  MQTT.createClient({
    uri: 'mqtt://192.168.161.215:1883',
    clientId: 'your_client_id',
  })
    .then(function (client) {
 
      client.on('connect', function () {
        console.log('connected');
        client.subscribe('esp32/distance', 0);
      });
      client.on('message', function(msg) {
        console.log('mqtt.event.message', msg.data);
      });
     
      client.connect();
    })
    .catch(function (err) {
      console.log(err);
    });

  return (
    <View>
      <Button
          title="test"
          onPress={() => {
            //   console.log(mqttClient);
            // client.publish('esp32/output', 'on', 0, true);

            MQTT.createClient({
              uri: 'mqtt://192.168.161.215:1883',
              clientId: 'your_client_id',
            })
              .then(function (client) {
           
                client.on('connect', function () {
                  console.log('connected');
                  client.publish('esp32/output', 'on', 0, true);
                });
                client.on('message', function(msg) {
                  console.log('mqtt.event.message', msg.data);
                });
               
                client.connect();
              })
              .catch(function (err) {
                console.log(err);
              });
          }}
        />
      
      <Text>parkingLight</Text>
    </View>
  );
}