import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { Colors } from '../../constants/colors'

const customStatHeader = () => {
  const colorScheme = useColorScheme()
      
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <View style={[styles.container, { backgroundColor: theme.header }]}>
      <View style={styles.wrapper}>
        <Text style={[styles.title, { color: theme.text, fontFamily: 'InconsolataBold' }]} >Statistics</Text>

        <TouchableOpacity style={styles.button}>
          <FontAwesome5 name='download' size={18} color={'#007AFF'} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default customStatHeader

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  title: {
    fontSize: 18,
  },
  button: {
    padding: 8, 
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: '#7676801f',
  },
})