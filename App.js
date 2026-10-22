import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Alert } from 'react-native';
import NetInfo from '@netInfo';

export default function App() {
  const [isVeraActive, setIsVeraActive] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [statusText, setStatusText] = useState('VERA Core is Active & Securing System');

  useEffect(() => {
    // असली नेटवर्क कनेक्शन जांचने की व्यवस्था
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        setStatusText('WARNING: Network Disconnected! Secure Mode Enabled.');
      } else {
        setStatusText('VERA Core is Active & Securing System');
      }
    });
    return () => unsubscribe();
  }, []);

  // मास्टर किल-स्विच फंक्शन (सिस्टम को तुरंत रोकने के लिए)
  const toggleMasterKillSwitch = () => {
    if (isVeraActive) {
      setIsVeraActive(false);
      setStatusText('MASTER KILL-SWITCH ENGAGED: VERA Core Halted.');
      Alert.alert('Security Alert', 'VERA Voice Core has been completely shut down for emergency protection.');
    } else {
      setIsVeraActive(true);
      setStatusText('VERA Core Restored & Securing System');
      Alert.alert('System Resumed', 'VERA Voice Core is back online.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isVeraActive ? '#0a0a0a' : '#2b0000' }]}>
      <StatusBar barStyle="light-content" />
      
      <Text style={styles.title}>VERA: VOICE CORE</Text>
      <Text style={styles.subtitle}>High-Security Android AI Assistant</Text>

      <View style={styles.card}>
        <Text style={styles.label}>System Status:</Text>
        <Text style={[styles.statusValue, { color: isVeraActive ? '#00ffcc' : '#ff4444' }]}>
          {isVeraActive ? 'SECURE & RUNNING' : 'OFFLINE (SHUTDOWN)'}
        </Text>

        <Text style={styles.label}>Network Status:</Text>
        <Text style={styles.netValue}>
          {isConnected ? 'Connected to Internet' : 'Offline / Disconnected'}
        </Text>

        <Text style={styles.detailText}>{statusText}</Text>
      </View>

      {/* मास्टर किल-स्विच बटन */}
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: isVeraActive ? '#ff3333' : '#00cc66' }]} 
        onPress={toggleMasterKillSwitch}
      >
        <Text style={styles.buttonText}>
          {isVeraActive ? 'ENGAGE KILL-SWITCH' : 'RESTORE VERA CORE'}
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
    color: '#888888',
    marginBottom: 30,
  },
  card: {
    width: '100%',
    backgroundColor: '#161616',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333333',
    marginBottom: 30,
  },
  label: {
    fontSize: 12,
    color: '#aaaaaa',
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
    fontSize: 13,
    color: '#dddddd',
    marginTop: 15,
    fontStyle: 'italic',
  },
  button: {
    width: '100%',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
