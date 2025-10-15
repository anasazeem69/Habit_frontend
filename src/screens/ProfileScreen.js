
import React, { useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Not logged in</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.label}>Full Name:</Text>
      <Text style={styles.value}>{user.fullName}</Text>
      <Text style={styles.label}>Phone:</Text>
      <Text style={styles.value}>{user.phone}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>
      <Text style={styles.label}>Professional:</Text>
      <Text style={styles.value}>{user.professional}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  value: {
    fontSize: 18,
    marginBottom: 4,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
