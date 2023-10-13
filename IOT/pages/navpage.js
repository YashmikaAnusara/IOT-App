import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MotionLightDetection from './navpages/MotionLightDetection';
import ParkingManagement from './navpages/ParkingManagement';

const Tab = createBottomTabNavigator();

export default function NavPage() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          display: 'flex',
          position: 'absolute',
          bottom: 15,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="ParkingManagement"
        component={ParkingManagement}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 5,
              }}>
              <Image
                source={require('../assets/parking-lot.png')}
                resizeMode="contain"
                style={{
                  width: 35,
                  height: 35,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  textAlign: 'center',
                  color: focused ? '#5DB075' : '#3C3C43',
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                Parking Management
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MotionLightDetection"
        component={MotionLightDetection}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 5,
              }}>
              <Image
                source={require('../assets/lightning.png')}
                resizeMode="contain"
                style={{
                  width: 35,
                  height: 35,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  textAlign: 'center',
                  color: focused ? '#5DB075' : '#3C3C43',
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                Motion Light Detection
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Pins"
        component={MotionLightDetection}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 5,
              }}>
              <Image
                source={require('../assets/fire.png')}
                resizeMode="contain"
                style={{
                  width: 35,
                  height: 35,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  textAlign: 'center',
                  color: focused ? '#5DB075' : '#3C3C43',
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                Fire Detection & Notification
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={MotionLightDetection}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 5,
              }}>
              <Image
                source={require('../assets/map.png')}
                resizeMode="contain"
                style={{
                  width: 35,
                  height: 35,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  textAlign: 'center',
                  color: focused ? '#5DB075' : '#3C3C43',
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                IDK
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 4,
  },
});
