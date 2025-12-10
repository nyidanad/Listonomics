import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'

import Ionicons from '@expo/vector-icons/Ionicons'

type itemAddModalProps = {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

type Priority = 'medium' | 'high' | null
type Unit = 'ml' | 'cl' | 'l' | 'mg' | 'g' | 'kg' | 'ton' | 'mm' | 'cm' | 'm' | 'km' | 'inch' | 'feet' | 'yard' | 'mile' | 'pieces' | 'pack' | 'box' | 'pair' | 'set' | 'roll' | 'bundle' | 'slice' | 'bag' | 'cup' | 'tbsp' | 'tsp' | 'Wh' | 'kWh' | null

const itemAddModal = ({ showModal, setShowModal }: itemAddModalProps) => {
  const [name, setName] = useState<string>('')
  const [priority, setPriority] = useState<Priority>(null)
  const [unit, setUnit] = useState<Unit>(null)
  const [price, setPrice] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(1)
  const [description, setDescription] = useState<string>('')
  const [showDescription, setShowDescription] = useState<boolean>(false)

  const onClose = () => {
    setName('')
    setPriority(null)
    setUnit(null)
    setPrice(0)
    setQuantity(1)
    setDescription('')
    setShowDescription(false)
    setShowModal(false)
  }

  const decreasePrice = () => setPrice(prev => Math.max(0, prev - 1))
  const increasePrice = () => setPrice(prev => prev + 1)
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1))
  const increaseQuantity = () => setQuantity(prev => prev + 1)

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
          <View style={styles.headerWrapper}>
            <Text style={styles.headerTitle}>Amount</Text>
            <View style={styles.sumBox}>
              <Text style={styles.headerCurrency}>$</Text>
              <Text style={styles.headerSum}>{price*quantity}</Text>
            </View>
          </View>

          {/* Details */}
          <View style={styles.detailsWrapper}>
            <View style={styles.detailsBox}>
              <Text style={styles.text}>Name</Text>
              <TextInput 
                style={styles.textInput} 
                value={name} 
                onChangeText={setName} 
                placeholder='Type name here...' 
                placeholderTextColor={'#C8C8C8'}
              />
            </View>

            <View style={styles.detailsBox}>
              <Text style={styles.text}>Attributes</Text>
              <TouchableOpacity style={[styles.attributebuttons, styles.prioritybuttons]}>
                <View style={styles.priorityView}>
                  <View style={styles.priorityCircle} />
                </View>
                <Text style={styles.attributeText}>{priority == null ? 'Priority' : priority }</Text>
                <Ionicons name="add" size={16} color="#363636" style={{ marginLeft: 5 }} />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.attributebuttons, styles.unitbuttons]}>
                <Text style={styles.attributeText}>{unit == null ? 'Unit' : unit }</Text>
                <Ionicons name="add" size={16} color="#363636" style={{ marginLeft: 5 }} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Price & Quantity */}
          <View style={styles.pqWrapper}>
            <View style={[styles.pqBox, { marginBottom: 10, }]}>
              <Text style={styles.text}>Price</Text>
              <View style={styles.pqButton}>
                <Ionicons name="remove" style={styles.pqIcon} onPress={decreasePrice} />
                <TextInput 
                  style={styles.numberInput} 
                  value={price.toString()} 
                  onChangeText={(text) => setPrice(Number(text) || 0)}
                  keyboardType='numeric'
                />
                <Ionicons name="add" style={styles.pqIcon} onPress={increasePrice} />
              </View>
            </View>

            <View style={styles.pqBox}>
              <Text style={styles.text}>Quantity</Text>
              <View style={styles.pqButton}>
                <Ionicons name="remove" style={styles.pqIcon} onPress={decreaseQuantity} />
                <TextInput 
                  style={styles.numberInput} 
                  value={quantity.toString()} 
                  onChangeText={(text) => setQuantity(Number(text) || 1)}
                  keyboardType='numeric'
                />
                <Ionicons name="add" style={styles.pqIcon} onPress={increaseQuantity} />
              </View>
            </View>
          </View>

          {/* Description & Buttons */}
          <View style={styles.buttonsWrapper}>
            <Text style={styles.text}>+ Description</Text>
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default itemAddModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    backgroundColor: '#F6F6F6',
    width: '90%',
    height: 'auto',
    paddingVertical: 10,
    borderRadius: 20,
  },
  headerWrapper: {
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    color: '#363636',
    marginBottom: 15
  },
  sumBox: {
    position: 'relative',
  },
  headerCurrency: {
    fontSize: 18,
    color: '#C7C7CC',
    textAlign: 'right',
    position: 'absolute',
    top: -2,
    left: -12,
  },
  headerSum: {
    fontSize: 32,
    color: '#363636',
  },
  text: {
    width: '35%',
    color: '#989CA9',
  },
  detailsWrapper: {
    paddingHorizontal: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  detailsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
    color: '#363636',
    paddingHorizontal: 13,
  },
  attributebuttons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderStyle: 'dashed',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  prioritybuttons: {
    paddingHorizontal: 10,
    marginRight: 10,
  },
  unitbuttons: {
    paddingHorizontal: 3,
  },
  priorityView: {
    backgroundColor: '#989CA9',
    width: 20,
    height: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityCircle: {
    width: 12,
    height: 12,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    borderRadius: 999,
  },
  attributeText: {
    color: '#363636',
    marginLeft: 8,
  },
  pqWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  pqBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pqButton: {
    flex: 1,
    maxWidth: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
  },
  pqIcon: {
    fontSize: 18,
    color: '#E5E5EA',
    padding: 3,
  },
  numberInput: {
    textAlign: 'center',
    color: '#363636',
    paddingHorizontal: 15,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  buttons: {
    flexDirection: 'row',
  },
  cancelButton: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E2E2',
  },
  saveButton: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginLeft: 15,
    borderRadius: 10,
    backgroundColor: '#007AFF',
  },
  cancelText: {
    color: '#363636',
  },
  saveText: {
    color: '#ffffff',
  },
})