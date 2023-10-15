import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../component/header';

export default function FireDetectionNotification() {
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
