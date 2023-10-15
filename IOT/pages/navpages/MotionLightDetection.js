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
const Person = require('../../assets/person.png');
const Car = require('../../assets/car.png');
const None = require('../../assets/none.png');
const PIR_ON = require('../../assets/pir-on.png');
const PIR_OFF = require('../../assets/pir-off.png');
const LIGHT_ON = require('../../assets/light-on.png');
const LIGHT_OFF = require('../../assets/light-off.png');

export default function MotionLightDetection() {
  const [Detection, setDetection] = useState('None');
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

                  {Detection === 'person' ? (
                    <>
                      <ImageBackground
                        source={Person}
                        style={styles.cardImageDetection}
                      />
                      <Text style={styles.cardSecondTitle}>{Detection}</Text>
                    </>
                  ) : Detection === 'car' ? (
                    <>
                      <ImageBackground
                        source={Car}
                        style={styles.cardImageDetection}
                      />
                      <Text style={styles.cardSecondTitle}>{Detection}</Text>
                    </>
                  ) : (
                    <>
                      <ImageBackground
                        source={None}
                        style={styles.cardImageDetection}
                      />
                      <Text style={styles.cardSecondTitle}>{Detection}</Text>
                    </>
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card}>
                <View>
                  <Text style={styles.cardTitle}>Sensor</Text>
                  {Sensor === 'On' ? (
                    <>
                      <ImageBackground
                        source={PIR_ON}
                        style={styles.cardImageSensor}
                      />
                      <Text style={styles.cardSecondTitle}>{Sensor}</Text>
                    </>
                  ) : Sensor === 'Off' ? (
                    <>
                      <ImageBackground
                        source={PIR_OFF}
                        style={styles.cardImageSensor}
                      />
                      <Text style={styles.cardSecondTitle}>{Sensor}</Text>
                    </>
                  ) : null}
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.secondBottomContainer}>
              <TouchableOpacity style={styles.BottomCard}>
                <View>
                  <Text style={styles.cardTitle}>Lights</Text>
                  <View style={styles.lightCardContainer}>
                    {Lights === 'On' ? (
                      <>
                        <ImageBackground
                          source={LIGHT_ON}
                          style={styles.cardImageSensor}
                        />
                        <Text style={styles.cardSecondTitle}>{Lights}</Text>
                      </>
                    ) : Lights === 'Off' ? (
                      <>
                        <ImageBackground
                          source={LIGHT_OFF}
                          style={styles.cardImageSensor}
                        />
                        <Text style={styles.cardSecondTitle}>{Lights}</Text>
                      </>
                    ) : null}
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
    height: 180,
    width: '98%',
    backgroundColor: '#f18484',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
  },
  cardImageDetection: {
    top: 5,
    height: 135,
    // bottom: 43,
    // alignSelf: 'flex-end',
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
