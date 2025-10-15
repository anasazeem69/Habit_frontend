import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import ThreeDotsMenu from '../components/ThreeDotsMenu';

const HomeScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext);

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleLogout = async () => {
    await logout();
    // Navigation will be handled automatically by AppNavigator when user state changes
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Habit Tracking</Text>
        <ThreeDotsMenu onProfile={handleProfile} onLogout={handleLogout} />
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Welcome to Habit Tracking!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#f5f5f5',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
