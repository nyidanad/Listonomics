import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicons from '@expo/vector-icons/Ionicons'
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal } from "@gorhom/bottom-sheet"
import { forwardRef, useCallback, useMemo, useState } from "react"
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'

import TextInput from '../inputField/bottom-sheet-textinput'
import Dropdown from '../dropdown/dropdown'
import DateTimePicker from '../dateTimePicker/dateTimePicker'

type Props = {
  title: string,
  color: string,
  onClose: () => void
}

type Ref = BottomSheetModal

type Categories = {
  name: keyof typeof MaterialCommunityIcons.glyphMap,
  category: string
}

type Priorities = {
  label: string,
  value: string
}

const icons: Categories[] = [
  { name: 'silverware-fork-knife', category: 'Food' },
  { name: 'beer', category: 'Drink' },
  { name: 'glass-wine', category: 'Alcohol' },
  { name: 'cookie', category: 'Snack' },
  { name: 'tshirt-crew', category: 'Clothing' },
  { name: 'lipstick', category: 'Beauty' },
  { name: 'pill', category: 'Health' },
  { name: 'lightning-bolt', category: 'Tech' },
  { name: 'home', category: 'House' },
  { name: 'school', category: 'School' },
  { name: 'airplane', category: 'Travel' },
  { name: 'gamepad-variant', category: 'Gaming' },
  { name: 'baby-carriage', category: 'Baby' },
  { name: 'paw', category: 'Pets' },
]

const priorites: Priorities[] = [
  { label: 'None', value: 'None' },
  { label: 'Low', value: 'Low' },
  { label: 'Medium', value: 'Medium' },
  { label: 'High', value: 'High' },
]

const BottomSheet = forwardRef<Ref, Props>((props, ref) => {
  const snapPoints = useMemo(() => ['53%', '53%', '71%'], [])
  const [snapIndex, setSnapIndex] = useState(0)
  const [item, setItem] = useState('')
  const [iconIndex, setIconIndex] = useState<number | null>(null)
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [expireDate, setExpireDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [priority, setPriority] = useState(priorites[0])

  // Render Backdrop component
  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop {...props} />
  ), [])

  // Handeling BottomSheet close event
  const onSheetClose = (index: number) => {
    if (index === -1) {
      props.onClose()
      setItem('')
      setIconIndex(null)
      setPrice('')
      setQuantity('')
      setExpireDate(new Date())
      setPriority(priorites[0])
    }
    setSnapIndex(index)
  }

  // Handeling Icon press event
  const onIconChange = (index: number) => {
    if (index === iconIndex)
      return setIconIndex(null)
    setIconIndex(index)
  }

  // Handling DateTimePicker modal
  const onDTPChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false)
    if (selectedDate) {
      setExpireDate(selectedDate)
    }
  }

  return (
    <BottomSheetModal
      style={styles.container}
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      onChange={onSheetClose}
      enableContentPanningGesture={false}
    >
      <View>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={props.onClose}>
            <Ionicons name='chevron-back' color={'#4AA0F1'} size={16} />
            <Text style={{ color: '#4AA0F1' }}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{props.title}</Text>
          <View style={styles.headerButton} />
        </View>

        <TextInput value={item} placeholder='Name' keyboardtype='default' onChangeText={(text) => setItem(text)} />
        
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {icons.map((icon, index) => {
              const isActive = iconIndex === index
              return (
                <View key={index} style={{ marginRight: 25 }}>
                  <TouchableWithoutFeedback onPress={() => onIconChange(index)}>
                    <View style={[styles.iconCircle, isActive && { backgroundColor: props.color }]}>
                      <MaterialCommunityIcons name={icon.name} style={styles.icon} />
                    </View>
                  </TouchableWithoutFeedback>
                  <Text style={styles.iconLabel}>{icon.category}</Text>
                </View>
              )
            })}
          </ScrollView>
        </View>

        <View style={styles.cost}>
          <View style={styles.priceInput}>
            <TextInput 
              value={price} 
              placeholder='Price' 
              keyboardtype='numeric' 
              onChangeText={(text) => {
                if (text.length === 0 || parseInt(text) >= 0) {
                  setPrice(text)
                }
                else {
                  Alert.alert('⚠️ WARNING', 'The minimum value of price is: 0')
                  setPrice('')
                }
              }}
            />
          </View>

          <View style={styles.quantityInput}>
            <TextInput 
              value={quantity} 
              placeholder='Quantity' 
              keyboardtype='numeric' 
              onChangeText={(text) => {
                if (text.length === 0 || parseInt(text) >= 1) {
                  setQuantity(text)
                }
                else {
                  Alert.alert('⚠️ WARNING', 'The minimum value of quantity is: 1')
                  setQuantity('')
                }
              }} />
          </View>
        </View>

        {snapIndex >= 2 && (
          <>
            <DateTimePicker 
              value={expireDate} 
              show={showDatePicker}
              label={true}
              labelText='Expire date'
              onPress={() => setShowDatePicker(true)} 
              onChange={onDTPChange}
            />

            <Dropdown
              data={priorites} 
              value={priority} 
              label={true} 
              placeholder='Priority' 
              icon='chevron-expand' 
              onChange={(priority) => {setPriority(priority)}} 
            />
          </>
        )}
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={[styles.addItemButton, { backgroundColor: props.color }]}>
          <Text style={styles.addItemText}>Add Item</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  )
})

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  buttonWrapper: {
    top: 45,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minWidth: '20%',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#363636',
    margin: 'auto',
  },

  iconCircle: {
    width: 43,
    height: 43,
    borderRadius: 999,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    color: '#fff',
  },
  iconLabel: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },

  cost: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceInput: {
    flex: 1,
    marginRight: 15,
  },
  quantityInput: {
    flex: 1,
  },

  addItemButton: {
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
})

export default BottomSheet