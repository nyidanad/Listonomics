import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'

import ItemAddModal from '../modals/itemAddModal'
import { Colors } from '../../constants/colors'

type ItemButonProps = {
  lid: string,
  category: string,
}

const itemButton = ({ lid, category }: ItemButonProps) => {
  const colorScheme = useColorScheme()
      
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  const [showModal, setShowModal] = useState<boolean>(false)

  const onPress = () => {
    setShowModal(true)
  }

  return (
    <>
      <TouchableOpacity style={[styles.container, { borderBottomColor: theme.addItemButton }]} onPress={onPress}>
        <View style={[styles.checkbox, { borderColor: theme.addItemButton }]} />
        <Text style={[styles.text, { color: theme.addItemButton }]}>+ Add item</Text>
      </TouchableOpacity>

      <ItemAddModal lid={lid} category={category} showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}

export default itemButton

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 3, 
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    marginLeft: 15,
    marginBottom: 15,
    marginTop: 5,
  },
  text: {
    fontSize: 15,
    marginBottom: 5,
  },
  checkbox: {
    width: 22,
    height: 22,
    marginRight: 13,
    borderRadius: 999,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
})