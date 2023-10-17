import {
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  View
} from 'react-native';
import React, {useState} from 'react';
import MQTT from 'sp-react-native-mqtt';
import Header from '../../component/header';

export default function FireDetectionNotification() {

  const [Type, setType] = useState('');

  MQTT.createClient({
    uri: 'mqtt://192.168.166.182:1883',
    clientId: 'your_client_id',
  })
    .then(function (client) {
      client.on('connect', function () {
        console.log('connected');

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
    <SafeAreaView>
      <ScrollView>
        <View style={styles.screenContainer}>
          <Header />
          <Text>Fire Detection & Notification</Text>
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
