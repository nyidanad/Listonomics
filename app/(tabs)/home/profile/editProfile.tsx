import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { router, useLocalSearchParams } from 'expo-router'
import { Image } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'

import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import * as ImagePicker from 'expo-image-picker'

import { supabase } from '../../../../utils/supabase'
import CustomHeader from '../../../../components/header/customHeader'
import BannerPickerModal from '../../../../components/modals/bannerPickerModal'

const PlaceholderImage = require('../../../../assets/windows.png')

const editProfile = () => {
  const params = useLocalSearchParams();

  const uid: string = params.uid as string
  const email: string  = params.email as string
  const [name, setName] = useState<string>(params.name as string)
  const [description, setDescription] = useState<string>(params.description as string)
  const [bannerColor, setBannerColor] = useState<[string, string, ...string[]]>(JSON.parse(params.bannerColor as string))
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined)
  const [showModal, setShowModal] = useState<boolean>(false)

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    }
  }

  const handleSave = async () => { 
    try {
      if (!uid) return

      const { error: authError } = await supabase.auth.updateUser({
        data: { name: name }
      })

      const { error: updateError } = await supabase
        .from('profile_settings')
        .update({
          description: description,
          banner_color: bannerColor
        })
        .eq('uid', uid)

      console.log('[PUT] Profile updated successfully.')
      router.replace({ 
        pathname: 'home/profile', 
        params: { 
          name, 
          description, 
          bannerColor: JSON.stringify(bannerColor) 
        } 
      })

      if (updateError || authError) {
        console.log("Auth error:", authError)
        console.log("Update error:", updateError)
        return
      }

    } catch (error) {
      console.log("Update failed:", error)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            onPress={handleSave} 
          />
          
          <View style={styles.container}>

            {/* header */}
            <View style={styles.header}>
              <LinearGradient
                colors={bannerColor}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.banner} 
              >
                <TouchableOpacity style={styles.edit} onPress={() => setShowModal(true)}>
                  <MaterialIcons name="mode-edit" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                
                <View style={styles.headerContent}>
                  <Image
                    style={styles.image}
                    source={selectedImage || PlaceholderImage}
                  />
                  <Text style={styles.name}>{name}</Text>
                  <Text style={styles.email}>{email}</Text>

                  {/* image edit button */}
                  <TouchableOpacity style={styles.camera} onPress={pickImageAsync}>
                    <Ionicons name="camera" size={24} color="#535353" />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
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

          <BannerPickerModal showModal={showModal} setShowModal={setShowModal} bannerColor={bannerColor} setBannerColor={setBannerColor} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    marginBottom: 15,
    height: 240,
    alignItems: 'center',
  },
  banner: {
    position: 'relative',
    width: '100%',
    height: 120,
    borderRadius: 16,
    alignItems: 'center',
  },
  edit: {
    position: 'absolute',
    right: 0,
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
    justifyContent: 'center',
    alignItems: 'center',
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
    position: 'fixed',
    top: -90,
    right: -40,
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