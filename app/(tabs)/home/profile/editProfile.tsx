import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'

import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import CustomHeader from '../../../../components/header/customHeader'
import { Image } from 'expo-image'

const editProfile = () => {
  const [name, setName] = useState<string>('Nyíri Dániel')
  const [email, setEmail] = useState<string>('@example.com')
  const [description, setDescription] = useState<string | undefined>("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.")
  const [som, setSom] = useState<Date>(new Date("2024-12-16"))

  const asd = async () => {
    await console.log("asd")
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, }}>
       <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <CustomHeader 
          title='Edit Profile' 
          backTo='Cancel' 
          backToPath='home/profile'
          action='Save' 
          onPress={async () => await asd()} 
        />
        
        <View style={styles.container}>

          {/* header */}
          <View style={styles.header}>
            <LinearGradient
              colors={['#37C5CE', '#3889FD']}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={styles.banner} 
            >
              <TouchableOpacity style={styles.edit}>
                <MaterialIcons name="mode-edit" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </LinearGradient>
            <View style={styles.headerContent}>
              <Image
                style={styles.image}
                source={require("../../../../assets/windows.png")}
              />
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.email}>{email}</Text>

              {/* image edit button */}
              <TouchableOpacity style={styles.camera}>
                <Ionicons name="camera" size={24} color="#535353" />
              </TouchableOpacity>
            </View>
          </View>

          {/* details */}
          <View style={styles.details}>
            <View>
              <Text style={styles.detailsTitle}>Name</Text>
              <TextInput 
                value={name}
                onChangeText={setName}
                style={styles.inputText} />
            </View>
            <View>
              <Text style={styles.detailsTitle}>Description</Text>
              <TextInput 
                value={description}
                onChangeText={setDescription} 
                style={[styles.inputText, { minHeight: 100, maxHeight: 155, textAlignVertical: 'top' }]} 
                multiline
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default editProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#FFFFFF'
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    marginBottom: 15,
    paddingBottom: 120,
  },
  banner: {
    position: 'relative',
    width: '100%',
    height: 120,
    borderRadius: 16,
    alignItems: 'flex-end',
  },
  edit: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  headerContent: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 999,
    borderWidth: 5,
    borderColor: '#FFFFFF',
    marginBottom: 3,
  },
  name: {
    color: '#363636',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  email: {
    color: '#989CA9',
    fontSize: 12,
    textAlign: 'center',
  },
  camera: {
    position: 'absolute',
    top: 65,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
  },
  details: {
    flex: 1,
  },
  detailsTitle: {
    color: '#363636',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputText: {
    color: '#363636',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 10,
    padding: 10,
  }
})