import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'

const signup = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const checkPassword = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) return;

    // TODO
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <>
        <Image style={styles.background} source={require("../../assets/images/background.png")} />
        <View style={styles.backdrop} />
      </>

      <View style={styles.header}>
        <Image style={styles.logo} source={require("../../assets/images/logo/Listify-light.png")} />
        <Text style={styles.section}>Create your{'\n'}Account</Text>
        <Text style={styles.description}>Enter your details to create a new account</Text>
      </View>

      <View style={styles.container}>
        {/* name */}
        <View style={styles.inputWrapper}>
          <Ionicons name={'person-outline'} size={24} style={styles.icon} />
          <TextInput 
            value={name}
            onChangeText={setName}
            style={styles.textinput}
            placeholder='Name'
            placeholderTextColor={'#BBBBBE'}
          />
        </View>

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
          />
          </View>
          <Ionicons name={'eye-off-outline'} size={24} style={styles.icon} />
        </View>

        {/* Signup button */}
        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>

        <Text style={styles.gtc}>
          By signing up, you're agree to our{' '}
          <Text style={styles.link}>Terms & Conditions</Text>
          {' '}and{' '}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>

        <View style={styles.footerWrapper}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => [router.replace('login'), router.dismissAll()]}>
            <Text style={styles.footerButtonText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default signup

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
  signupButton: {
    backgroundColor: '#2164E7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  signupText: {
    color: '#FAFAFA',
    fontSize: 16,
  },
  gtc: {
    color: '#999999',
    fontSize: 12,
  },
  link: {
    color: '#2164E7',
    textDecorationLine: 'underline',
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