import { StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'

import { Colors } from '../../constants/colors'

type CategoryButtonProps = {
  onPress: () => void
}

const categoryButton = ({ onPress }: CategoryButtonProps) => {
  const colorScheme = useColorScheme()

  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <TouchableOpacity style={[styles.container, { borderBottomColor: theme.addCategoryButton }]} onPress={onPress}>
      <Text style={[styles.text, { color: theme.addCategoryButton }]}>+ Add category</Text>
    </TouchableOpacity>
  )
}

export default categoryButton

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#D5D5D5',
    borderStyle: 'dashed',
    marginTop: 15,
  },
  text: {
    color: '#D5D5D5',
    fontSize: 15,
    marginBottom: 5,
  },
})