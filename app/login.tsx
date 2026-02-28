import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

const login = () => {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', top: '50%' }}>
      <Text>Login page</Text>
    </SafeAreaView>
  )
}

export default login

const styles = StyleSheet.create({})