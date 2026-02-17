import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'

import Ionicons from '@expo/vector-icons/Ionicons'

import assets from '../../../data/assets.json'
import settings from '../../../data/settings.json'

type settingsModalProps = {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  request?: () => Promise<void>
}

const currencyModal = ({ showModal, setShowModal, request }: settingsModalProps) => {
  const currencies = assets.currencies
  const [activeCurrency, setAactiveCurrency] = useState(settings.currency)

  const onSave = () => {}

  const onClose = () => {
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
          {/* Header */}
          <View>
            <Text style={styles.title}>Select your currency</Text>
            <Text style={styles.message}>This will update how amounts are displayed throughout the application. You can change the currency anytime.</Text>
          </View>

          {/* Currencies */}
          <ScrollView style={styles.currencyContainer}>
            {currencies.map((currency, index) => {
              const isActive = activeCurrency === currency.currency

              return (
                <TouchableOpacity 
                  key={index} 
                  style={[styles.currencyContant, isActive && {backgroundColor: '#FFF'}]} 
                  onPress={() => setAactiveCurrency(currency.currency)}
                >
                  <View style={styles.currencyWrapper}>
                    <View style={styles.iconContainer}>
                      <Text style={styles.icon}>{currency.symbol}</Text>
                    </View>
                    <Text style={styles.currency}>{currency.currency}</Text>
                    {currency.currency === "Forint" && <Text style={styles.default}>Default</Text>}
                  </View>
                  {isActive && <Ionicons name='checkmark-outline' style={styles.checkmark} />}
                </TouchableOpacity>
              )
            })}
          </ScrollView>

          {/* Buttons */}
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.actionButton]} onPress={onSave}>
              <Text style={styles.actionText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default currencyModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    backgroundColor: '#FAFAFA',
    paddingVertical: 15,
    borderRadius: 15,
    elevation: 5,
    width: '90%',
    height: 'auto',
    marginBottom: 20,
  },
  title: {
    color: '#363636',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  message: {
    color: '#989CA9',
    fontSize: 14,
    paddingHorizontal: 20,
    marginBottom: 17,
  },
  currencyContainer: {
    maxHeight: 300,
  },
  currencyContant: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    marginVertical: 3,
  },
  currencyWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#ECEFF3',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 15,
  },
  icon: {
    color: '#40485F',
    fontSize: 20,
  },
  currency: {
    color: '#363636',
    fontSize: 16,
  },
  default: {
    color: '#989CA9',
    fontSize: 10,
    borderRadius: 999,
    backgroundColor: '#F1F1F1',
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 20,
  },
  checkmark: {
    color: '#2ECC71',
    fontSize: 18,
    borderRadius: 999,
    padding: 1,
    backgroundColor: 'rgba(46, 204, 113, 0.25)',
    marginRight: 20,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 12,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
    height: 45,
    borderRadius: 15,
  },
  cancelButton: {
    backgroundColor: '#F3F5F9',
  },
  cancelText: {
    color: '#363636',
  },
  actionButton: {
    backgroundColor: '#007AFF',
  },
  actionText: {
    color: '#FAFAFA',
  },
})