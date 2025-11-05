import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type ItemProps = {
  name: string
  price: number
  quantity: number
  checked: boolean
  color: string
  priority: 'normal' | 'medium' | 'high'
  unit?: string
  description?: string
}

const item = ({ name, price, quantity, checked, color, priority, unit, description }: ItemProps) => {
  return (
    <View>
      <Text>item</Text>
    </View>
  )
}

export default item

const styles = StyleSheet.create({})