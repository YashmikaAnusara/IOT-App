import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import React, {useState, useEffect} from 'react';
import MQTT from 'sp-react-native-mqtt';
import Header from '../../component/header';
const Heat = require('../../assets/heat.png');
const Cool = require('../../assets/cool.png');
const Alarm_on = require('../../assets/Alarm.png');
const Alarm_off = require('../../assets/Alarm_off.png');
const Fire = require('../../assets/fire.png');
const None = require('../../assets/none.png');
const Gas_on = require('../../assets/gas.png');

export default function FireDetectionNotification() {
  const [Flame, setFlame] = useState('5');
  const [Gas, setGas] = useState('');
  const [Temperature, setTemperature] = useState('');
  const [Alarm, setAlarm] = useState('');
  const [Slot_Notification, setSlot_Notification] = useState('');

  useEffect(() => {
    MQTT.createClient({
      uri: 'mqtt://192.168.43.208:1883',
      clientId: 'your_client_id_1',
    })
      .then(function (client1) {
        console.log('called');
        client1.on('connect', function () {
          console.log('connected');

          client1.subscribe('Sensor/Detection/Flame', 0);
          client1.subscribe('Sensor/Detection/Gas', 0);
          client1.subscribe('Sensor/Detection/Temperature', 0);
          client1.subscribe('Sensor/Detection/Alarm', 0);
          client1.subscribe('Sensor/Detection/Slot_Notification', 0);
        });
        client1.on('message', function (msg) {
          if (msg.topic === 'Sensor/Detection/Flame') {
            setFlame(msg.data);
          }
          if (msg.topic === 'Sensor/Detection/Gas') {
            setGas(msg.data);
          }
          if (msg.topic === 'Sensor/Detection/Temperature') {
            setTemperature(msg.data);
          }
          if (msg.topic === 'Sensor/Detection/Alarm') {
            setAlarm(msg.data);
          }
          if (msg.topic === 'Sensor/Detection/Slot_Notification') {
            setSlot_Notification(msg.data);
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
                  <Text style={styles.cardTitle}>Temperature</Text>
                  {Temperature <= 60 ? (
                    <>
                      <ImageBackground
                        source={Cool}
                        style={styles.cardImageDetection}
                      />
                      <Text style={styles.cardSecondTitle}>{Temperature}</Text>
                    </>
                  ) : Temperature > 61 ? (
                    <>
                      <ImageBackground
                        source={Heat}
                        style={styles.cardImageDetection}
                      />
                      <Text style={styles.cardSecondTitle}>{Temperature}</Text>
                    </>
                  ) : null}
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card}>
              <View>
                <Text style={styles.cardTitle}>Alarm</Text>
                {Alarm === 'Alarm Activated!' ? (
                  <>
                    <ImageBackground
                      source={Alarm_on}
                      style={styles.cardImageFireDetection}
                    />
                    <Text style={styles.cardSecondTitle}>Alarm Activated</Text>
                  </>
                ) : Alarm === 'Alarm Deactivated.' ? (
                  <>
                    <ImageBackground
                      source={Alarm_off}
                      style={styles.cardImageFireDetection}
                    />
                    <Text style={styles.cardSecondTitle}>Alarm Deactivated</Text>
                  </>
                ) : null}
              </View>
              </TouchableOpacity>
            </View>
            <View style={styles.firstBottomContainer}>
              <TouchableOpacity style={styles.card}>
                <View>
                  <Text style={styles.cardTitle}>Flame</Text>
                  {Flame == 1 ? (
                    <>
                      <ImageBackground
                        source={Fire}
                        style={styles.cardImageSensor}
                      />
                      <Text style={styles.cardSecondTitle}>Flame Detected</Text>
                    </>
                  )  : (
                    <>
                      <ImageBackground
                        source={None}
                        style={styles.cardImageSensor}
                      />
                      <Text style={styles.cardSecondTitle}>Flame not Detected</Text>
                    </>
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card}>
                <View>
                  <Text style={styles.cardTitle}>Gas</Text>
                  {Gas == 1 ? (
                    <>
                      <ImageBackground
                        source={Gas_on}
                        style={styles.cardImageSensor}
                      />
                      <Text style={styles.cardSecondTitle}>Gas Detected</Text>
                    </>
                  ) : (
                    <>
                      <ImageBackground
                        source={None}
                        style={styles.cardImageSensor}
                      />
                      <Text style={styles.cardSecondTitle}>Gas not Detected</Text>
                    </>
                  ) }
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.secondBottomContainer}>
              {Alarm === 'Alarm Activated!' ? (
                <>
                  <TouchableOpacity style={styles.BottomCard}>
                    <View>
                      <Text style={styles.cardTitle}>Alert</Text>
                      <View style={styles.lightCardContainer}>
                        <Text style={styles.cardSecondTitle}>
                          {Slot_Notification}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              ) : Alarm === 'Alarm Deactivated.' ? (
                <>
                  <TouchableOpacity style={styles.BottomCard_no_Alert}>
                    <View>
                      <Text style={styles.cardTitle}>Alert</Text>
                      <View style={styles.lightCardContainer}>
                        <Text style={styles.cardSecondTitle}>
                          {Slot_Notification}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              ) : null}
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
    textAlign: 'center',
  },
  secondBottomContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    paddingTop: 10,
  },
  BottomCard: {
    height: 80,
    width: '98%',
    backgroundColor: '#c0172a',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
    paddingTop: 15,
  },
  BottomCard_no_Alert: {
    height: 80,
    width: '98%',
    backgroundColor: '#0B6623',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
    paddingTop: 15,
  },
  cardImageDetection: {
    top: 3,
    height: 120,
    width: 60,
    alignSelf: 'center',
  },
  cardImageFireDetection: {
    top: 3,
    height: 120,
    width: 100,
    alignSelf: 'center',
  },
  cardImageSensor: {
    top: 5,
    height: 135,
    width: 135,
    // alignSelf: 'flex-end',
  },
  cardSecondTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    alignSelf: 'center',
  },
  lightCardContainer: {
    display: 'flex',
    alignItems: 'stretch',
  },
});
