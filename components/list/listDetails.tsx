import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

type ListDetailsProps = {
  title: string
  icon: keyof typeof FontAwesome5.glyphMap
  color: string
  information: string
}

const listDetails = ({ title, icon, color, information }: ListDetailsProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View>
          <View style={[styles.icon, { backgroundColor: color }]}>
            <FontAwesome5 name={icon} size={16} color={'#FAFAFA'} />
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.information}>{information}</Text>
      </View>
    </View>
  )
}

export default listDetails

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EAEAEB',
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
    color: '#363636',
    fontSize: 12,
    marginTop: 3,
  },
  information: {
    color: '#363636',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
})