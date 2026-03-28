import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

import { Colors } from '../../constants/colors'

type ListDetailsProps = {
  title: string
  icon: keyof typeof FontAwesome5.glyphMap
  color: string
  information: string
}

const listDetails = ({ title, icon, color, information }: ListDetailsProps) => {
  const colorScheme = useColorScheme()
    
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View>
          <View style={[styles.icon, { backgroundColor: color }]}>
            <FontAwesome5 name={icon} size={16} color={'#FAFAFA'} />
          </View>
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        </View>
        <Text style={[styles.information, { color: theme.text }]}>{information}</Text>
      </View>
    </View>
  )
}

export default listDetails

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7676801f',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    width: '48%'
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 28,
    height: 28,
    borderRadius: 8,
  },
  title: {
    fontSize: 12,
    marginTop: 3,
  },
  information: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
})