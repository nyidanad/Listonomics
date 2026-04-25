import { StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Feather from '@expo/vector-icons/Feather'
import { Colors } from '../../../constants/colors'
import { useState } from 'react'

const AI = () => {
  const colorScheme = useColorScheme()
  
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  const [prompt, setPrompt] = useState('');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.headerButton}>
          <Feather name="menu" size={24} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Feather name="edit" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Hello Daniel</Text>
        <Text style={styles.subtitle}>How can i assist you today?</Text>
      </View>

      <View style={styles.quickActionContainer}>
      </View>

      <View style={styles.inputContainer}>
        <TextInput 
          value={prompt}
          onChangeText={setPrompt}
          style={[styles.textinput, { backgroundColor: theme.itemInput, borderColor: theme.itemInputBorder }]}
          placeholder='Ask my anything...'
          placeholderTextColor={'#959DB1'}
          multiline
        />
        {prompt &&
          <TouchableOpacity style={styles.sendButton}>
            <Feather name="arrow-up" size={24} color="#E6E6E6" />
          </TouchableOpacity>
        }
      </View>
    </SafeAreaView>
  )
}

export default AI

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButton: {
    backgroundColor: '#7676801f',
    padding: 10,
    borderRadius: 999,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 200,
    flex: 1,
  },
  title: {
    color: '#A099C7',
    fontSize: 36,
    fontFamily: 'InconsolataBold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#959DB1',
    fontSize: 20,
    fontFamily: 'InconsolataRegular',
    textAlign: 'center',
  },
  quickActionContainer: {
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textinput: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 2,
    borderRadius: 20,
    maxHeight: 150,
    color: '#959DB1',
    fontSize: 16,
  },
  sendButton: {
    width: 50,
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 999,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
})