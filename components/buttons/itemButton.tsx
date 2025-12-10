import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import ItemAddModal from '../modals/itemAddModal'

const itemButton = () => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const onPress = () => {
    setShowModal(true)
  }

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.checkbox} />
        <Text style={styles.text}>+ Add item</Text>
      </TouchableOpacity>

      <ItemAddModal showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}

export default itemButton

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 3, 
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
    borderStyle: 'dashed',
    marginLeft: 15,
    marginBottom: 15,
    marginTop: 5,
  },
  text: {
    color: '#DEDEDE',
    fontSize: 15,
    marginBottom: 5,
  },
  checkbox: {
    width: 22,
    height: 22,
    marginRight: 13,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderStyle: 'dashed',
  },
})