import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'

const forgotPassword = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <>
        <Image style={styles.background} source={require("../../assets/images/background.png")} />
        <View style={styles.backdrop} />
      </>

      <View style={styles.header}>
        <Image style={styles.logo} source={require("../../assets/images/logo/Listify-light.png")} />
        <Text style={styles.section}>Forgot your{'\n'}Password?</Text>
        <Text style={styles.description}>Enter your email to receive a password reset link</Text>
      </View>

      <View style={styles.container}>
        {/* email */}
        <View style={styles.inputWrapper}>
          <Ionicons name={'mail-open-outline'} size={24} style={styles.icon} />
          <TextInput 
            value={email}
            onChangeText={setEmail}
            style={styles.textinput}
            placeholder='Email'
            placeholderTextColor={'#BBBBBE'}
          />
        </View>

        {/* send code button */}
        <TouchableOpacity style={styles.sendButton} onPress={() => router.push('(auth)/changePassword')}>
          <Text style={styles.sendText}>Send code</Text>
        </TouchableOpacity>

        <View style={styles.footerWrapper}>
          <Text style={styles.footerText}>Didn't recieve the verification code? </Text>
          <TouchableOpacity>
            <Text style={styles.footerButtonText}>Resend code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default forgotPassword

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
  footerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  footerText: {
    color: '#92959A',
  },
  footerButtonText: {
    color: '#2164E7',
    textDecorationLine: 'underline',
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