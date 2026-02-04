import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'

import assets from '../../data/assets.json'
import { LinearGradient } from 'expo-linear-gradient'

type bannerPickerModalProps = {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  bannerColor: [string, string, ...string[]]
  setBannerColor: Dispatch<SetStateAction<[string, string, ...string[]]>>
}

const bannerPickerModal = ({ showModal, setShowModal, bannerColor, setBannerColor }: bannerPickerModalProps) => {
  const bannerColors = assets.banner_colors as [string, string, ...string[]][]
  const [selectedBanner, setSelectedBanner] = useState(bannerColor)

  const onClose = () => {
    setShowModal(false)
  }

  const onSave = () => {
    setBannerColor(selectedBanner)
    setShowModal(false)
  }

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={showModal}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Choose banner color</Text>
          <View style={styles.colorWrapper}>
            {bannerColors.map((banner, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => setSelectedBanner(banner)}>
                  <LinearGradient
                    colors={banner}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.banner} 
                  >
                    {JSON.stringify(selectedBanner) === JSON.stringify(banner) && <View style={styles.bannerInnerCircle} /> }
                  </LinearGradient>
                </TouchableOpacity>
              )
            })}
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={onClose}>
              <Text style={styles.buttonCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={onSave}>
              <Text style={styles.buttonSaveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default bannerPickerModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    elevation: 5,
    width: '90%',
    height: 'auto',
  },
  title: {
    color: '#C7C7CC',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  colorWrapper: {
    marginVertical: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerInnerCircle: {
    width: 25,
    height: 25,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
  },
  banner: {
    width: 45,
    height: 45,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  buttonCancel: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  buttonCancelText: {
    color: '#363636',
  },
  buttonSave: {
    backgroundColor: '#007AFF',
  },
  buttonSaveText: {
    color: '#FAFAFA',
  },
})