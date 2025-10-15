import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ThreeDotsMenu = ({ onProfile, onLogout }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons name="ellipsis-vertical" size={24} color="black" />
      </TouchableOpacity>
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.overlay} onPress={() => setModalVisible(false)}>
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => { setModalVisible(false); onProfile && onProfile(); }} style={styles.menuItem}>
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setModalVisible(false); onLogout && onLogout(); }} style={styles.menuItem}>
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 40,
    paddingRight: 16,
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    minWidth: 120,
    elevation: 4,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: 16,
  },
});

export default ThreeDotsMenu;
