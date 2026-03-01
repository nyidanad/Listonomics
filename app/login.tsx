import { Button, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useContext } from 'react'
import { AuthContext } from '../utils/authContext'

const login = () => {
  const authContext = useContext(AuthContext)

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', top: '50%' }}>
      <Text>Login page</Text>
      <Button title='Log in' onPress={authContext.logIn} />
    </SafeAreaView>
  )
}

export default login

const styles = StyleSheet.create({})