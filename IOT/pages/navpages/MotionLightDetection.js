import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import MQTT from 'sp-react-native-mqtt';
import Header from '../../component/header';

export default function MotionLightDetection() {
  const [Detection, setDetection] = useState('');
  const [Sensor, setSensor] = useState('');
  const [Lights, setLights] = useState('');

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
          client1.subscribe('Models/Detection/Green_LED', 0);
        });
        client1.on('message', function (msg) {
          if (msg.topic == 'Models/Detection/Type') {
            setDetection(msg.data);
          }
          if (msg.topic == 'Models/Detection/Sensor') {
            setSensor(msg.data);
          }
          if (msg.topic == 'Models/Detection/Green_LED') {
            setLights(msg.data);
          }
        });

        client1.connect();
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.screenContainer}>
          <Header />
          <Text>Motion Light Detection</Text>
          <Text>Detection : {Detection}</Text>
          <Text>Sensor :{Sensor}</Text>
          <Text>Lights :{Lights}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 10,
  },
});
