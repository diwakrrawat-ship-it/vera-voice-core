import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Alert } from 'react-native';

export default function App() {
  const [isVeraActive, setIsVeraActive] = useState(true);
  const [statusText, setStatusText] = useState('VERA Core is Active & Securing System');

  const toggleVeraSwitch = () => {
    if (isVeraActive) {
      setIsVeraActive(false);
      setStatusText('MASTER KILL-SWITCH ENGAGED: VERA Core halted.');
      Alert.alert('Security Alert', 'VERA Voice Core has been completely shut down for emergency protection.');
    } else {
      setIsVeraActive(true);
      setStatusText('System Restored, VERA Core is back online.');
      Alert.alert('System Restored', 'VERA Voice Core is back online.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isVeraActive ? '#0a0a0a' : '#2a0000' }]}>
      <StatusBar barStyle="light-content" />
      
      <Text style={styles.title}>VERA: Voice Core</Text>
      <Text style={styles.subtitle}>High-Security Android AI Assistant</Text>

      <View style={styles.card}>
        <Text style={styles.label}>System Status:</Text>
        <Text style={[styles.statusValue, { color: isVeraActive ? '#4CAF50' : '#F44336' }]}>
          {isVeraActive ? 'SECURE & RUNNING' : 'SHUTDOWN'}
        </Text>

        <Text style={styles.label}>Security Mode:</Text>
        <Text style={styles.netValue}>
          {isVeraActive ? 'Shield Active & Monitoring' : 'Emergency Mode Engaged'}
        </Text>

        <Text style={styles.detailText}>{statusText}</Text>
      </View>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: isVeraActive ? '#F44336' : '#4CAF50' }]}
        onPress={toggleVeraSwitch}
      >
        <Text style={styles.buttonText}>
          {isVeraActive ? 'ENGAGE KILL-SWITCH' : 'WAKE VERA CORE'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#aaaaaa',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    maxWidth: 350,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#333333',
  },
  label: {
    fontSize: 14,
    color: '#888888',
    marginTop: 10,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 2,
  },
  netValue: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 2,
  },
  detailText: {
    fontSize: 12,
    color: '#cccccc',
    marginTop: 15,
    fontStyle: 'italic',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
