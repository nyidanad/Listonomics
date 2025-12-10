import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Checkbox from 'expo-checkbox'

type ItemProps = {
  name: string
  // price: number
  // quantity: number
  checked: boolean
  color: string
  priority: 'medium' | 'high' | null
  // unit?: string
  // description?: string
}

const item = ({ name, checked, color, priority }: ItemProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked)

  const getPriorityColor = (priority: string | null) => {
    switch (priority) {
      case 'medium': {
        return '#FFC602'
      }
      case 'high': {
        return '#FF3B30'
      }
      case null: {
        return ''
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Checkbox 
          value={isChecked} 
          onValueChange={() => setIsChecked(!isChecked)} 
          color={isChecked ? '#D9D9D9' : undefined} 
          style={[styles.checkbox, !isChecked && { borderColor: '#363636', borderWidth: 1.5 }]} 
        />
        <Text style={isChecked ? styles.textChecked : styles.text}>{name}</Text>
      </View>
      <View style={[styles.priority, { backgroundColor: getPriorityColor(priority) }]} />
    </View>
  )
}

export default item

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
    borderStyle: 'dashed',
  },
  wrapper: {
    flexDirection: 'row',
  },
  checkbox: {
    borderRadius: 999,
    marginRight: 13,
    width: 22,
    height: 22,
  },
  text: {
    fontSize: 16,
  },
  textChecked: {
    color: '#D9D9D9',
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  priority: {
    width: 10,
    height: 10,
    borderRadius: 999,
    marginRight: 6,
  }
})