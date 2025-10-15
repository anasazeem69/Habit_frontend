
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';
import { colors } from '../config/colors';

const ProfileScreen = () => {
  const { user, loading, logout, getRemainingSessionTime } = useContext(AuthContext);
  const [sessionTimeLeft, setSessionTimeLeft] = useState('');

  useEffect(() => {
    if (user) {
      const updateSessionTime = () => {
        const remainingMs = getRemainingSessionTime();
        if (remainingMs > 0) {
          const days = Math.floor(remainingMs / (24 * 60 * 60 * 1000));
          const hours = Math.floor((remainingMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

          if (days > 0) {
            setSessionTimeLeft(`${days} day${days > 1 ? 's' : ''} ${hours} hour${hours > 1 ? 's' : ''}`);
          } else if (hours > 0) {
            const minutes = Math.floor((remainingMs % (60 * 60 * 1000)) / (60 * 1000));
            setSessionTimeLeft(`${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`);
          } else {
            const minutes = Math.floor(remainingMs / (60 * 1000));
            setSessionTimeLeft(`${minutes} minute${minutes > 1 ? 's' : ''}`);
          }
        } else {
          setSessionTimeLeft('Expired');
        }
      };

      updateSessionTime();
      const interval = setInterval(updateSessionTime, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [user, getRemainingSessionTime]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
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

      <View style={styles.profileCard}>
        <Text style={styles.label}>Full Name:</Text>
        <Text style={styles.value}>{user.fullName}</Text>

        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{user.phone}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>Professional:</Text>
        <Text style={styles.value}>{user.professional}</Text>

        <View style={styles.sessionInfo}>
          <Text style={styles.sessionLabel}>Session expires in:</Text>
          <Text style={[
            styles.sessionValue,
            getRemainingSessionTime() < 24 * 60 * 60 * 1000 && styles.sessionWarning
          ]}>
            {sessionTimeLeft}
          </Text>
          <Text style={styles.sessionNote}>
            Your session will automatically expire after 7 days. You'll be logged out when it expires.
          </Text>
        </View>
      </View>

      <Button
        title="Logout"
        onPress={logout}
        variant="outline"
        style={styles.logoutButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.secondary,
    marginTop: 12,
  },
  value: {
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: 4,
  },
  sessionInfo: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  sessionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  sessionValue: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
    marginTop: 4,
  },
  sessionWarning: {
    color: colors.warning,
  },
  sessionNote: {
    fontSize: 12,
    color: colors.text.tertiary,
    marginTop: 6,
    lineHeight: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  logoutButton: {
    marginTop: 12,
  },
});

export default ProfileScreen;
