import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
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
          <View style={styles.bottomContainer}>
            <View style={styles.firstBottomContainer}>
              <TouchableOpacity style={styles.card}>
                <View>
                  <Text style={styles.cardTitle}>Detection</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card}>
                <View>
                  <Text style={styles.cardTitle}>Sensor</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.secondBottomContainer}>
              <TouchableOpacity style={styles.BottomCard}>
                <View>
                  <Text style={styles.cardTitle}>Lights</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
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
  bottomContainer: {
    padding: 1,
    paddingTop: 20,
  },
  firstBottomContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    paddingTop: 20,
  },
  card: {
    height: 180,
    width: '48%',
    backgroundColor: '#f18484',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  secondBottomContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    paddingTop: 10,
  },
  BottomCard: {
    height: 180,
    width: '98%',
    backgroundColor: '#f18484',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
  },
});
