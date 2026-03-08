import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'

const changePassword = () => {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <>
        <Image style={styles.background} source={require("../../assets/images/background.png")} />
        <View style={styles.backdrop} />
      </>

      <View style={styles.header}>
        <Image style={styles.logo} source={require("../../assets/images/logo/Listify-light.png")} />
        <Text style={styles.section}>Change your{'\n'}Password</Text>
        <Text style={styles.description}>Set a new password to continue</Text>
      </View>

      <View style={styles.container}>
        {/* password */}
        <View style={[styles.inputWrapper, { justifyContent: 'space-between' }]}>
          <View style={styles.passwordWrapper}>
            <Ionicons name={'key-outline'} size={24} style={styles.icon} />
            <TextInput 
            value={password}
            onChangeText={setPassword}
            style={styles.textinput}
            placeholder='Password'
            placeholderTextColor={'#BBBBBE'}
            autoCapitalize='none'
          />
          </View>
          <Ionicons name={'eye-off-outline'} size={24} style={styles.icon} />
        </View>

        {/* confirm password */}
        <View style={[styles.inputWrapper, { justifyContent: 'space-between' }]}>
          <View style={styles.passwordWrapper}>
            <Ionicons name={'key-outline'} size={24} style={styles.icon} />
            <TextInput 
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.textinput}
            placeholder='Confirm password'
            placeholderTextColor={'#BBBBBE'}
            autoCapitalize='none'
          />
          </View>
          <Ionicons name={'eye-off-outline'} size={24} style={styles.icon} />
        </View>

        {/* send code button */}
        <TouchableOpacity style={styles.sendButton} onPress={() => [router.replace('login'), router.dismissAll()]}>
          <Text style={styles.sendText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default changePassword

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 30,
    marginBottom: 15,
  },
  section: {
    color: '#FAFAFA',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    color: '#FAFAFA',
    fontSize: 12,
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 15,
  },
  inputWrapper: {
    borderColor: '#F2F2F7',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#BBBBBE',
  },
  textinput: {
    color: '#363636',
    marginLeft: 10,
  },
  sendButton: {
    backgroundColor: '#2164E7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  sendText: {
    color: '#FAFAFA',
    fontSize: 16,
  },
  backdrop: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    width: '100%',
    height: '50%',
    backgroundColor: 'rgba(33, 100, 231, 0.55)',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -2,
    width: '100%',
    height: '50%',
  },
})