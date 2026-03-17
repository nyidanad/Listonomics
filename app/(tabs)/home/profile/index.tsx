import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'

import Ionicons from '@expo/vector-icons/Ionicons'
import CustomHeader from '../../../../components/header/customHeader'
import { AuthContext } from '../../../../utils/authContext'
import { supabase } from '../../../../utils/supabase'

type ProfileSettings = {
  id: number,
  banner_color: [string, string, ...string[]],
  description: string,
  uid: string
}

const profile = () => {
  const authContext = useContext(AuthContext)
  const router = useRouter()
  const navigation = useNavigation()
  const [profileSettings, setProfileSettings] = useState<ProfileSettings>()

  const getProfileData = async () => {
    let query = supabase.from('profile_settings').select('*').eq('uid', authContext.user?.id).single()

    const { data, error } = await query

    setProfileSettings(data)
    console.log('[GET] Profile fetched successfully.')
  }

  useEffect(() => {
    if (!authContext.user?.id) return

    const loadProfile = () => getProfileData()
    loadProfile()
    const unsubscribe = navigation.addListener('focus', loadProfile)
    return () => unsubscribe()
  }, [navigation])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader 
        title='Profile' 
        backTo='Home' 
        backToPath='' 
        action='Edit' 
        onPress={() => router.replace({ 
          pathname: 'home/profile/editProfile', 
          params: {
            uid: authContext.user?.id,
            name: authContext.user?.name, 
            email: authContext.user?.email,
            description: profileSettings?.description, 
            bannerColor: JSON.stringify(profileSettings?.banner_color) 
          }
        })}
      />
      
      <View style={styles.container}>

        {/* header */}
        <View style={styles.header}>
          <LinearGradient 
          colors={profileSettings?.banner_color || ['#FAFAFA', '#F1F1F1']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.banner} />
          <View style={styles.headerContent}>
            <Image
              style={styles.image}
              source={require("../../../../assets/windows.png")}
            />
            <Text style={styles.name}>{authContext.user?.name}</Text>
            <Text style={styles.email}>{authContext.user?.email}</Text>
          </View>
        </View>

        {/* details */}
        <View style={styles.details}>
          {profileSettings?.description && (
            <View>
              <Text style={styles.detailsTitle}>Description</Text>
              <Text style={styles.descriptionText}>{profileSettings?.description}</Text>
            </View>
          )}
          <View>
            <Text style={styles.detailsTitle}>Start of Membership</Text>
            <View style={styles.somWrapper}>
              <Ionicons name="calendar" size={14} color="#5B5E63" />
              <Text style={styles.som}>{new Date(authContext.user?.created_at ?? '').toLocaleDateString("hu-HU")}</Text>
            </View>
          </View>
        </View>

        {/* buttons */}
        {/* <View style={styles.buttons}>

        </View> */}

        {/* sign out */}
        <TouchableOpacity style={styles.signout} onPress={authContext.logOut}>
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