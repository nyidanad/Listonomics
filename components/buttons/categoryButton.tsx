import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

type CategoryButtonProps = {
  onPress: () => void
}

const categoryButton = ({ onPress }: CategoryButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>+ Add category</Text>
    </TouchableOpacity>
  )
}

export default categoryButton

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#C3C3C5',
    borderStyle: 'dashed',
  },
  text: {
    color: '#C3C3C5',
    fontSize: 15,
    marginBottom: 5,
  },
})