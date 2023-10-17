import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MQTT from 'sp-react-native-mqtt';
import Header from '../../component/header';
const hmdity = require('../../assets/hmdity.png');
const hmdity_W = require('../../assets/hmdity-w.png');
const LIGHT_ON = require('../../assets/light-on.png');
const LIGHT_OFF = require('../../assets/light-off.png');
export default function ParkingManagement() {
  const [Type, setType] = useState('');
  const [distanceSensorSlot1, setSensorDistanceS1] = useState('');
  const [distanceSensorSlot2, setSensorDistanceS2] = useState('');
  const [humidity, sethumidity] = useState('');
  const [lightS1, setLightS1] = useState(0);
  const lightsOn = () => {
    MQTT.createClient({
      uri: 'mqtt://192.168.234.215:1883',
      clientId: 'your_client_id',
    })
      .then(function (client) {
        client.on('connect', function () {
          console.log('connected');
          client.publish('esp32/output', 'on', 0, true);
        });
        client.on('message', function (msg) {
          console.log('mqtt.event.message', msg.data);
        });

        client.connect();
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  const lightsOff = () => {
    MQTT.createClient({
      uri: 'mqtt://192.168.234.215:1883',
      clientId: 'your_client_id',
    })
      .then(function (client) {
        client.on('connect', function () {
          console.log('connected');
          client.publish('esp32/output', 'off', 0, true);
        });
        client.on('message', function (msg) {
          console.log('mqtt.event.message', msg.data);
        });

        client.connect();
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  useEffect(() => {
    MQTT.createClient({
      uri: 'mqtt://192.168.234.215:1883',
      clientId: 'your_client_id_1',
    })
      .then(function (client1) {
        console.log('called');
        client1.on('connect', function () {
          console.log('connected');

          client1.subscribe('parking/slot_1', 0);
          client1.subscribe('parking/slot_2', 0);
          client1.subscribe('parking/humidity', 0);
          client1.subscribe('Parking/lightSlot1', 0);
          // client1.subscribe('Models/Detection/Sensor', 0);
          // client1.subscribe('Models/Detection/Green_LED', 0);
        });
        client1.on('message', function (msg) {
          if (msg.topic == 'parking/slot_1') {
            console.log(msg.data);
            setSensorDistanceS1(msg.data);
          }
          if (msg.topic == 'parking/slot_2') {
            console.log(msg.data);
            setSensorDistanceS2(msg.data);
          }
          if (msg.topic == 'parking/humidity') {
            console.log(msg.data);
            sethumidity(msg.data);
          }
          if (msg.topic == 'Parking/lightSlot1') {
            console.log('light' + msg.data);
            setLightS1(msg.data);
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
              <View style={styles.card}>
                <View>
                  <Text style={styles.pageMainTitle}>Current Humidity</Text>
                  {humidity > 60 ? (
                    <ImageBackground
                      source={hmdity_W}
                      style={styles.cardParkImages}
                    />
                  ) : (
                    <ImageBackground
                      source={hmdity}
                      style={styles.cardParkImages}
                    />
                  )}
                  <Text style={styles.pageMainTitle}>{humidity} %</Text>
                </View>
              </View>
              <View style={styles.card}>
                <Text>Parking Slots</Text>
                <View>
                  <Text>Slot 1 Status:{distanceSensorSlot1}</Text>
                  <Text>Slot 2 Status:{distanceSensorSlot2}</Text>
                </View>
              </View>
            </View>
            <View style={styles.secondBottomContainer}>
              <TouchableOpacity style={styles.BottomCard}>
                <View>
                  <Text style={styles.cardTitle}>Light Slot 3</Text>
                  <View style={styles.lightCardContainer}>
                    {lightS1 !== '1' ? (
                      <TouchableOpacity onPress={lightsOn}>
                        <ImageBackground
                          source={LIGHT_OFF}
                          style={styles.cardImageSensor}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={lightsOff}>
                        <ImageBackground
                          source={LIGHT_ON}
                          style={styles.cardImageSensor}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
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
  cardParkImages: {
    top: 5,
    height: 135,
    width: 135,
    // alignSelf: 'flex-end',
  },
  pageMainTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    alignSelf: 'center',
  },
  cardSecondTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    alignSelf: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
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
  firstBottomContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    paddingTop: 20,
  },
  secondBottomContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    paddingTop: 10,
  },
  cardImageSensor: {
    top: 5,
    height: 135,
    width: 135,
    // alignSelf: 'flex-end',
  },
  bottomContainer: {
    padding: 1,
    paddingTop: 5,
  },
  lightCardContainer: {
    display: 'flex',
    alignItems: 'stretch',
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
