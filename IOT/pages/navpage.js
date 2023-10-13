import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import VehicleParkingLight from './navpages/parkingLight';

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
        component={VehicleParkingLight}
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
                source={require('../assets/profile.png')}
                resizeMode="contain"
                style={{
                  width: 35,
                  height: 35,
                  tintColor: focused ? '#5DB075' : '#3C3C43',
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  textAlign: 'center',
                }}>
                Parking Management
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MotionLightDetection"
        component={VehicleParkingLight}
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
                source={require('../assets/profile.png')}
                resizeMode="contain"
                style={{
                  width: 35,
                  height: 35,
                  tintColor: focused ? '#5DB075' : '#3C3C43',
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  textAlign: 'center',
                }}>
                Motion Light Detection
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Pins"
        component={VehicleParkingLight}
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
                source={require('../assets/profile.png')}
                resizeMode="contain"
                style={{
                  width: 35,
                  height: 35,
                  tintColor: focused ? '#5DB075' : '#3C3C43',
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  textAlign: 'center',
                }}>
                Fire Detection & Notification
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={VehicleParkingLight}
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
                source={require('../assets/profile.png')}
                resizeMode="contain"
                style={{
                  width: 35,
                  height: 35,
                  tintColor: focused ? '#5DB075' : '#3C3C43',
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  textAlign: 'center',
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
