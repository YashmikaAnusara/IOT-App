import {
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  StyleSheet,
} from 'react-native';
import React from 'react';
const ProfilePic = require('../assets/profile-pic.png');

export default function Header() {
  return (
    <View style={styles.topContainer}>
      <Text style={styles.welcomeTopic}>Hi, Username!</Text>
      <TouchableOpacity>
        <ImageBackground source={ProfilePic} style={styles.profileImage} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    padding: 1,
  },
  welcomeTopic: {
    fontSize: 20,
    color: '#000',
    marginTop: 20,
    fontWeight: 'bold',
  },
  profileImage: {
    height: 60,
    width: 60,
    bottom: 43,
    alignSelf: 'flex-end',
  },
});
