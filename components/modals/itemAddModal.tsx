import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

import PriorityModal from './priorityModal'
import { supabase } from '../../utils/supabase'
import { Colors } from '../../constants/colors'

type itemAddModalProps = {
  lid: string,
  category: string,
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

type ErrorType = {
  nameError?: boolean,
  price?: boolean,
  quantity?: boolean,
}

type Priority = 'medium' | 'high' | null
type Unit = 'ml' | 'cl' | 'l' | 'mg' | 'g' | 'kg' | 'ton' | 'mm' | 'cm' | 'm' | 'km' | 'inch' | 'feet' | 'yard' | 'mile' | 'pieces' | 'pack' | 'box' | 'pair' | 'set' | 'roll' | 'bundle' | 'slice' | 'bag' | 'cup' | 'tbsp' | 'tsp' | 'Wh' | 'kWh' | null

const itemAddModal = ({ lid, category, showModal, setShowModal }: itemAddModalProps) => {
  const colorScheme = useColorScheme()

  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  const [name, setName] = useState<string>('')
  const [priority, setPriority] = useState<Priority>(null)
  const [unit, setUnit] = useState<Unit>(null)
  const [price, setPrice] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(1)
  const [description, setDescription] = useState<string>('')
  const [showDescription, setShowDescription] = useState<boolean>(false)
  const [showError, setShowError] = useState<ErrorType>({ nameError: false, price: false, quantity: false })
  const [showPriorityModal, setShowPriorityModal] = useState<boolean>(false)

  const checkForm = () => {
    if (name.trim() === '') {
      setShowError({ nameError: true })
      return
    }

    setShowError({ nameError: false, price: false, quantity: false })
    return true
  }

  const onClose = () => {
    setName('')
    setPriority(null)
    setUnit(null)
    setPrice(0)
    setQuantity(1)
    setDescription('')
    setShowDescription(false)
    setShowModal(false)
    setShowError({ nameError: false, price: false, quantity: false })
  }

  const onSave = () => {
    if (checkForm()) {
      postItem()
    }
  }

  const decreasePrice = () => setPrice(prev => Math.max(0, prev - 1))
  const increasePrice = () => setPrice(prev => prev + 1)
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1))
  const increaseQuantity = () => setQuantity(prev => prev + 1)

  const postItem = async () => {
    let cid = await supabase.from('categories').select('id').eq('title', category).single();

    try {
      const { error } = await supabase
        .from('items')
        .insert({
          name,
          price,
          quantity,
          priority,
          unit,
          description,
          lid,
          cid: cid.data?.id,
        })

        if (error) {
          throw Error('Item creation failed ', error)
        }

        console.log('[POST] Item created successfully.')
        onClose()
    } catch (err) {
      console.log('Item creation failed:', err)
    }
  }

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={showModal}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={[styles.content, { backgroundColor: theme.background }]}>
          
          {/* Header */}
          <View style={styles.headerWrapper}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>Amount</Text>
            <View style={styles.sumBox}>
              <Text style={[styles.headerCurrency, { color: theme.currency }]}>$</Text>
              <Text style={[styles.headerSum, { color: theme.text }]}>{price*quantity}</Text>
            </View>
          </View>

          {/* Details */}
          <View style={[styles.detailsWrapper, { borderBottomColor: theme.ruler }]}>
            <View style={styles.detailsBox}>
              <Text style={styles.text}>Name</Text>
              <TextInput 
                style={
                  showError.nameError 
                  ? [styles.textInput, styles.error, { backgroundColor: theme.itemInput, color: theme.text  }] 
                  : [styles.textInput, { backgroundColor: theme.itemInput, borderColor: theme.itemInputBorder, color: theme.text }]
                } 
                value={name} 
                onChangeText={setName} 
                placeholder='Type name here...' 
                placeholderTextColor={'#C8C8C8'}
              />
            </View>

            <View style={styles.detailsBox}>
              <Text style={styles.text}>Attributes</Text>
              <TouchableOpacity style={[styles.attributebuttons, styles.prioritybuttons, { borderColor: theme.itemInputBorder, backgroundColor: theme.itemInput }]} onPress={() => setShowPriorityModal(true)}>
                <View style={[styles.priorityView, priority === null ? { backgroundColor: theme.priority } : { backgroundColor: priority === 'medium' ? '#FFC602' : '#FF3B30' }]}>
                  <View style={styles.priorityCircle} />
                </View>
                <Text style={[styles.attributeText, { color: theme.text }]}>{priority == null ? 'Priority' : priority[0].toUpperCase() + priority.slice(1) }</Text>
                <Ionicons name="add" size={16} color={theme.text} style={{ marginLeft: 5 }} />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.attributebuttons, styles.unitbuttons, { borderColor: theme.itemInputBorder, backgroundColor: theme.itemInput }]}>
                <Text style={[styles.attributeText, { color: theme.text }]}>{unit == null ? 'Unit' : unit }</Text>
                <Ionicons name="add" size={16} color={theme.text} style={{ marginLeft: 5 }} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Price & Quantity */}
          <View style={[styles.pqWrapper, { borderBottomColor: theme.ruler }]}>
            <View style={[styles.pqBox, { marginBottom: 10, }]}>
              <Text style={styles.text}>Price</Text>
              <View style={[styles.pqButton, { borderColor: theme.itemInputBorder, backgroundColor: theme.itemInput }]}>
                <Ionicons name="remove" style={styles.pqIcon} onPress={decreasePrice} />
                <TextInput 
                  style={[styles.numberInput, { color: theme.text }]} 
                  value={price.toString()} 
                  onChangeText={(text) => setPrice(Number(text) || 0)}
                  keyboardType='numeric'
                />
                <Ionicons name="add" style={styles.pqIcon} onPress={increasePrice} />
              </View>
            </View>

            <View style={styles.pqBox}>
              <Text style={styles.text}>Quantity</Text>
              <View style={[styles.pqButton, { borderColor: theme.itemInputBorder, backgroundColor: theme.itemInput }]}>
                <Ionicons name="remove" style={styles.pqIcon} onPress={decreaseQuantity} />
                <TextInput 
                  style={[styles.numberInput, { color: theme.text }]} 
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
              <TouchableOpacity style={[styles.cancelButton, { borderColor: theme.itemCancelBorder }]} onPress={onClose}>
                <Text style={[styles.cancelText, { color: theme.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={onSave}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <PriorityModal showModal={showPriorityModal} setShowModal={setShowPriorityModal} setPriority={setPriority} />
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
    textAlign: 'right',
    position: 'absolute',
    top: -2,
    left: -12,
  },
  headerSum: {
    fontSize: 32,
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
  error: {
    borderColor: '#FF3B30',
    borderWidth: 1.5,
  },
})