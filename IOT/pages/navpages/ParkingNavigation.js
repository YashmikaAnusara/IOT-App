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
const parked = require('../../assets/parked.png');
const empty = require('../../assets/empty.png');

export default function ParkingNavigation() {
  const [ParkingSlot1, setParkingSlot1] = useState('off');
  const [ParkingSlot2, setParkingSlot2] = useState('on');

  const [S1, setS1] = useState(false);
  const [S2, setS2] = useState(false);

  useEffect(() => {
    MQTT.createClient({
      uri: 'mqtt://192.168.166.215:1883',
      clientId: 'your_client_id_1',
    })
      .then(function (client1) {
        console.log('called');
        client1.on('connect', function () {
          console.log('connected');

          client1.subscribe('parking/slot_1', 0);
          client1.subscribe('parking/slot_2', 0);
        });
        client1.on('message', function (msg) {
          if (msg.topic == 'parking/slot_1') {
            console.log(msg.data);
            setParkingSlot1(msg.data);
          }
          if (msg.topic == 'parking/slot_2') {
            console.log(msg.data);
            setParkingSlot2(msg.data);
          }
        });

        client1.connect();
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const Direction_1 = () => {
    setS1(true);
    setS2(false);
  };
  const Direction_2 = () => {
    setS1(false);
    setS2(true);
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.screenContainer}>
          <Header />
          <View style={styles.bottomContainer}>
            <View style={styles.firstBottomContainer}>
              {ParkingSlot1 === 'Parked' ? (
                <TouchableOpacity style={styles.card} onPress={Direction_1}>
                  <View>
                    <Text style={styles.cardTitle}>Parking Slot 1</Text>
                    <ImageBackground
                      on
                      source={parked}
                      style={styles.cardImageDetection}
                    />
                    <Text style={styles.cardSecondTitle}>{ParkingSlot1}</Text>
                  </View>
                </TouchableOpacity>
              ) : ParkingSlot1 === 'Empty' ? (
                <TouchableOpacity style={styles.card}>
                  <View>
                    <Text style={styles.cardTitle}>Parking Slot 1</Text>
                    <ImageBackground
                      source={empty}
                      style={styles.cardImageDetection}
                    />
                    <Text style={styles.cardSecondTitle}>{ParkingSlot1}</Text>
                  </View>
                </TouchableOpacity>
              ) : null}

              {ParkingSlot2 === 'Parked' ? (
                <TouchableOpacity style={styles.card} onPress={Direction_2}>
                  <View>
                    <Text style={styles.cardTitle}>Parking Slot 2</Text>
                    <ImageBackground
                      source={parked}
                      style={styles.cardImageDetection}
                    />
                    <Text style={styles.cardSecondTitle}>{ParkingSlot2}</Text>
                  </View>
                </TouchableOpacity>
              ) : ParkingSlot2 === 'Empty' ? (
                <TouchableOpacity style={styles.card}>
                  <Text style={styles.cardTitle}>Parking Slot 2</Text>
                  <View>
                    <ImageBackground
                      source={empty}
                      style={styles.cardImageDetection}
                    />
                    <Text style={styles.cardSecondTitle}>{ParkingSlot2}</Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.secondBottomContainer}>
              {S1 === true ? (
                <TouchableOpacity style={styles.BottomCard}>
                  <View>
                    <Text style={styles.cardTitle}>
                      Parking Slot 1 Direction
                    </Text>
                    <View style={styles.lightCardContainer}>
                      <Text style={styles.paddingDirection}>
                        <Text>
                          Pass the entrance , 
                          turn right.
                        </Text>
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : S2 === true ? (
                <TouchableOpacity style={styles.BottomCard}>
                  <View>
                    <Text style={styles.cardTitle}>
                    Parking Slot 2 Direction
                    </Text>
                    <View style={styles.lightCardContainer}>
                      <Text style={styles.paddingDirection}>
                      Pass the entrance 1 slot, 
                          turn right.
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
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
    height: 280,
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
    width: 135,
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
    top: 10,
  },
  paddingDirection: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
