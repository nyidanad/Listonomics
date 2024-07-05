import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker"

const colors = [
  '#FF342D',
  '#FF8A04',
  '#FFC602',
  '#18C04E',
  '#4AA0F1',
  '#0570FF',
  '#514BD3',
  '#E83A60',
  '#BB6CD7',
  '#937B5A',
  '#525C68',
  '#D79D96',
]

type MaterialCommunityIconsType = keyof typeof MaterialCommunityIcons.glyphMap

const icons: MaterialCommunityIconsType[] = [
  'cart',
  'format-list-bulleted',
  'map-marker-radius',
  'gift-outline',
  'cake-variant',
  'school',
  'gamepad-variant',
  'ticket',
  'cash-multiple',
  'dumbbell',
  'silverware-fork-knife',
  'car',
  'home',
  'lotion',
  'tshirt-crew',
  'baby-carriage',
  'pill',
  'paw',
 ]

const CIRCLE_SIZE = 40
const CIRCLE_RING_SIZE = 2
const ICON_CIRCLE_SIZE = 35
const ICON_CIRCLE_RING_SIZE = 2

const addList = () => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(new Date())
  const [color, setColor] = useState(4)
  const [icon, setIcon] = useState(1)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedColor, setSelectedColor] = useState(color)
  const [selectedIcon, setSelectedIcon] = useState(icon)


  // Handling DateTimePicker modal
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false)
    if (selectedDate) {
      setDate(selectedDate)
    }
  }
  

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleWrapper}>
          <View style={[styles.titleIcon, { backgroundColor: colors[color] }]}>
              <MaterialCommunityIcons name={icons[icon]} style={styles.selectedIcon} />
          </View>
          <TextInput
            value={title}
            onChangeText={text => {setTitle(text)}}
            placeholder='List Name'
            placeholderTextColor={'#B9B6B9'} 
            style={styles.inputTitleText}
          />
        </View>

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <View style={styles.dateWrapper}>
            <Text style={styles.dateText}>
              {date.toLocaleDateString('HU', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//, '.')}
            </Text>
            <MaterialCommunityIcons name="calendar-month-outline" style={styles.dateIcon} />
          </View>
        </TouchableOpacity>
        {showDatePicker && (<DateTimePicker value={date} is24Hour={true} mode={"date"} onChange={onChange} />)}

        <View style={styles.colorWrapper}>
          {colors.map((color, index) => {
            const isActive = selectedColor === index
            return (
              <View key={color}>
                <TouchableOpacity onPress={() => [setColor(index), setSelectedColor(index)]}>
                  <View style={[styles.circle, isActive && { borderColor: color }]}>
                    <View style={[styles.circleInner, { backgroundColor: color }]} />
                  </View>
                </TouchableOpacity>
              </View>
            )
          })}
        </View>

        <View style={styles.iconsWrapper}>
          {icons.map((icon, index) => {
            const isActive = selectedIcon === index
            return (
              <View key={icon}>
                <TouchableWithoutFeedback onPress={() => [setIcon(index), setSelectedIcon(index)]}>
                  <View style={[styles.iconCircle, isActive && { borderColor: '#494949' }]}>
                    <MaterialCommunityIcons name={icon} style={styles.icon} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )
          })}
        </View>
      </View>
      
      <TouchableOpacity>
        <View style={styles.addButtonWrapper}>
          <Ionicons name="checkmark-circle" style={styles.addButtonIcon} />
          <Text style={styles.addButtonText}>Create</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  titleWrapper: {
    height: 200,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  dateWrapper: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 25,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  colorWrapper: {
    height: 130,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iconsWrapper: {
    height: 190,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  titleIcon: {
    width: 100,
    height: 100,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  selectedIcon: {
    fontSize: 55,
    color: '#FFF',
  },
  inputTitleText: {
    backgroundColor: '#F4F4F6',
    borderRadius: 10,
    width: '100%',
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  dateText: {
    fontSize: 18,
  },
  dateIcon: {
    fontSize: 26,
  },
  
  circle: {
    width: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    height: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    borderRadius: 999,
    borderWidth: CIRCLE_RING_SIZE,
    borderColor: 'transparent',
    marginTop: 10,
    marginRight: 4,
  },
  circleInner: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: 999,
    position: 'absolute',
    top: CIRCLE_RING_SIZE,
    left: CIRCLE_RING_SIZE,
  },
  icon: {
    fontSize: 24,
    color: '#494949',
    backgroundColor: '#F4F4F6',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: ICON_CIRCLE_SIZE + ICON_CIRCLE_RING_SIZE * 4,
    height: ICON_CIRCLE_SIZE + ICON_CIRCLE_RING_SIZE * 4,
    borderRadius: 999,
    borderWidth: ICON_CIRCLE_RING_SIZE,
    backgroundColor: '#F4F4F6',
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginRight: 4,
    marginLeft: 4,
  },

  addButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 5,
  },
  addButtonIcon: {
    fontSize: 30,
    marginRight: 8,
    color: '#4AA0F1',
  },
  addButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#4AA0F1',
  },
})

export default addList