import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import Ionicons from '@expo/vector-icons/Ionicons'

import UnregisterModal from '../modals/settings/unregisterModal'

const unregisterButton = () => {
  const [showUnregisterModal, setShowUnregisterModal] = useState<boolean>(false)

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={() => setShowUnregisterModal(true)}>
        <View style={styles.leftIconWrapper}>
          <Ionicons name='close-circle' color={'#FB3D3D'} size={18} style={styles.leftIcon} />
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Unregister application</Text>
            <Text style={styles.tooltip}>Deauthorize this device</Text>
          </View>
        </View>

        <Ionicons name='chevron-forward' color={'#FB3D3D'} size={20} />
      </TouchableOpacity>

      <UnregisterModal showModal={showUnregisterModal} setShowModal={setShowUnregisterModal} />
    </>
  )
}

export default unregisterButton

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 8,
  },
  leftIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    backgroundColor: 'rgba(245, 73, 39, 0.1)',
    padding: 6,
    borderRadius: 8,
  },
  rightIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleWrapper: {
    marginLeft: 20,
  },
  title: {
    color: '#FB3D3D',
    fontSize: 16,
  },
  tooltip: {
    color: '#B1B1B1',
    fontSize: 10,

  },
  label: {
    color: '#AEB6C3',
    fontSize: 12,
    marginRight: 10,
  },
  switch: {
    position: 'absolute',
    right: 0,
  },
})