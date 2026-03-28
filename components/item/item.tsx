import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import Checkbox from 'expo-checkbox'

import { Colors } from '../../constants/colors'

type ItemProps = {
  name: string
  // price: number
  // quantity: number
  checked: boolean
  color: string
  priority: 'medium' | 'high' | null
  // unit?: string
  // description?: string
  onToggle: () => void
}

const item = ({ name, checked, color, priority, onToggle }: ItemProps) => {
  const colorScheme = useColorScheme()
    
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

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
    <View style={[styles.container, { borderBottomColor: theme.ruler }]}>
      <View style={styles.wrapper}>
        <Checkbox 
          value={checked} 
          onValueChange={() => onToggle()} 
          color={checked ? color+'99' : undefined} 
          style={[styles.checkbox, !checked && { borderColor: theme.text, borderWidth: 1.5 }]} 
        />
        <Text style={checked ? [styles.textChecked, { color: theme.cheked }] : [styles.text, { color: theme.text }]}>
          {name}
        </Text>
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
    borderStyle: 'dashed',
  },
  wrapper: {
    flexDirection: 'row',
  },
  checkbox: {
    borderRadius: 999,
    marginRight: 13,
    width: 20,
    height: 20,
  },
  text: {
    fontSize: 16,
  },
  textChecked: {
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