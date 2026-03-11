import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useContext, useState } from 'react'
import { Image } from 'expo-image'
import Ionicons from '@expo/vector-icons/Ionicons'
import Checkbox from 'expo-checkbox'

import { AuthContext } from '../utils/authContext'
import { useRouter } from 'expo-router'

const login = () => {
  const authContext = useContext(AuthContext)
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true);
    try {
      await authContext.logIn(email.trim(), password);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <>
        <Image style={styles.background} source={require("../assets/images/background.png")} />
        <View style={styles.backdrop} />
      </>

      <View style={styles.header}>
        <Image style={styles.logo} source={require("../assets/images/logo/Listify-light.png")} />
        <Text style={styles.section}>Sign in to your{'\n'}Account</Text>
        <Text style={styles.description}>Enter your email and password to log in</Text>
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
            autoCapitalize='none'
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
            autoCapitalize='none'
            secureTextEntry
          />
          </View>
          <Ionicons name={'eye-off-outline'} size={24} style={styles.icon} />
        </View>

        <View style={styles.actionsWrapper}>
          {/* remember me */}
          <View style={styles.rememberWrapper}>
            <Checkbox 
              value={isChecked} 
              onValueChange={() => setIsChecked(!isChecked)} 
              color={isChecked ? '#2164E7' : undefined} 
              style={[styles.checkbox, !isChecked && { borderColor: '#92959A', borderWidth: 1.5 }]} 
            />
            <Text style={styles.rememberText}>Remember me</Text>
          </View>

          {/* forgot password */}
          <TouchableOpacity onPress={() => router.push('(auth)/forgotPassword')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login button */}
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FAFAFA" size="small" />
          ) : (
            <Text style={styles.loginText}>Log in</Text>
          )}
        </TouchableOpacity>

        {/* social ruler */}
        <View style={styles.rulerWrapper}>
          <View style={styles.rulerLine} />
          <Text style={styles.rulerText}>Or</Text>
          <View style={styles.rulerLine} />
        </View>

        {/* socials */}
        <View>
          {/* Google */}
          <TouchableOpacity style={styles.socialButton}>
            <Image style={styles.socialImage} source={require("../assets/images/logo/google.png")} />
            <Text style={styles.socialText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Facebook */}
          <TouchableOpacity style={styles.socialButton}>
            <Image style={styles.socialImage} source={require("../assets/images/logo/facebook.png")} />
            <Text style={styles.socialText}>Continue with Facebook</Text>
          </TouchableOpacity>

          {/* Apple */}
          <TouchableOpacity style={styles.socialButton}>
            <Image style={styles.socialImage} source={require("../assets/images/logo/apple.png")} />
            <Text style={styles.socialText}>Continue with Apple</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerWrapper}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <Text style={styles.footerButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default login

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
  actionsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 30,
  },
  rememberWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    borderRadius: 5,
    marginRight: 8,
  },
  rememberText: {
    color: '#92959A',
  },
  forgotText: {
    color: '#2164E7',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#2164E7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
  },
  loginText: {
    color: '#FAFAFA',
    fontSize: 16,
  },
  rulerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  rulerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D1D6',
  },
  rulerText: {
    color: '#D1D1D6',
    marginHorizontal: 10,
  },
  socialButton: {
    borderColor: '#F2F2F7',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 10, 
  },
  socialImage: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  socialText: {
    color: '#363636',
  },
  footerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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