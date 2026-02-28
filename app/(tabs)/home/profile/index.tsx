import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams, useRouter } from 'expo-router'

import Ionicons from '@expo/vector-icons/Ionicons'

import assets from '../../../../data/assets.json'
import CustomHeader from '../../../../components/header/customHeader'
import { Image } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'

const profile = () => {
  const router = useRouter()
  const params = useLocalSearchParams()
  const bannerColors = assets.banner_colors as [string, string, ...string[]][]

  const [name, setName] = useState<string>('Nyíri Dániel')
  const [email, setEmail] = useState<string>('@example.com')
  const [description, setDescription] = useState<string>("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.")
  const [som, setSom] = useState<Date>(new Date("2024-12-16"))
  const [bannerColor, setBannerColor] = useState<[string, string, ...string[]]>(bannerColors[0])

  useEffect(() => {
    if (params.bannerColor) {
      setBannerColor(JSON.parse(params.bannerColor as string));
      console.log('changed banner')
    }
  }, [params.bannerColor]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader 
        title='Profile' 
        backTo='Home' 
        backToPath='' 
        action='Edit' 
        onPress={() => router.replace({ pathname: 'home/profile/editProfile', params: { name, description, bannerColor: JSON.stringify(bannerColor) }})} 
      />
      
      <View style={styles.container}>

        {/* header */}
        <View style={styles.header}>
          <LinearGradient 
          colors={bannerColor}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.banner} />
          <View style={styles.headerContent}>
            <Image
              style={styles.image}
              source={require("../../../../assets/windows.png")}
            />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
        </View>

        {/* details */}
        <View style={styles.details}>
          {description !== '' && (
            <View>
              <Text style={styles.detailsTitle}>Description</Text>
              <Text style={styles.descriptionText}>{description}</Text>
            </View>
          )}
          <View>
            <Text style={styles.detailsTitle}>Start of Membership</Text>
            <View style={styles.somWrapper}>
              <Ionicons name="calendar" size={14} color="#5B5E63" />
              <Text style={styles.som}>{som.toLocaleDateString("hu-HU")}</Text>
            </View>
          </View>
        </View>

        {/* buttons */}
        {/* <View style={styles.buttons}>

        </View> */}

        {/* sign out */}
        <TouchableOpacity style={styles.signout}>
          <Text style={styles.signoutText}>Sign out</Text>
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#FFFFFF'
  },
  header: {
    maxHeight: '39%',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    marginBottom: 15,
  },
  banner: {
    width: '100%',
    height: 120,
    borderRadius: 16,
  },
  headerContent: {
    alignItems: 'center',
    bottom: 55,
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
  details: {
    flex: 1,
  },
  detailsTitle: {
    color: '#363636',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descriptionText: {
    color: '#535353',
    marginBottom: 20,
  },
  somWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  som: {
    color: '#535353',
    marginLeft: 5,
  },
  signout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FF3B30',
  },
  signoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
})