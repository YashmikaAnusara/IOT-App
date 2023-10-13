import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import parkingLight from './navpages/parkingLight';

const Tab = createBottomTabNavigator();

export default function NavPage() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          //   display: 'flex',
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
        name="Feed"
        component={parkingLight}
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
                  //   textAlign:'center'
                }}>
                My Feed
              </Text>
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Stats"
        component={parkingLight}
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
                  //   textAlign:'center'
                }}>
                My Stats
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Pins"
        component={parkingLight}
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
                  //   textAlign:'center'
                }}>
                My Pins
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={parkingLight}
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
                  //   textAlign:'center'
                }}>
                My Profile
              </Text>
            </View>
          ),
        }}
      /> */}
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