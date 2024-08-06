import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker"
import { router } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'

import assets from '../../../data/assets.json'

type iconType = keyof typeof MaterialCommunityIcons.glyphMap

type List = {
  title: string
  date: Date
  color: string
  icon: keyof typeof MaterialCommunityIcons.glyphMap
}

type SQLRow = {
  serial: string
}

const CIRCLE_SIZE = 40
const CIRCLE_RING_SIZE = 2
const ICON_CIRCLE_SIZE = 35
const ICON_CIRCLE_RING_SIZE = 2

const addList = () => {
  const db = useSQLiteContext()
  const colors = assets.colors
  const icons = assets.icons as iconType[]
  
  const [list, setList] = useState<List>({ title: '', date: new Date(), color: colors[4], icon: icons[1] })
  const [selectedColor, setSelectedColor] = useState(list.color)
  const [selectedIcon, setSelectedIcon] = useState(list.icon)
  const [showDatePicker, setShowDatePicker] = useState(false)

  // POST List
  const postList = async () => {
    const statement = await db.prepareAsync('INSERT INTO Lists (title, date, color, icon, serial, flagged) VALUES ($title, $date, $color, $icon, $serial, $flagged)')
    let nextSerial: number = 0

    try {
      // get highest serial number
      for await (const row of db.getEachAsync<SQLRow>('SELECT serial FROM Lists')) {
        const serial = parseInt(row.serial)
        if(serial >= nextSerial) {
          nextSerial = serial
        }
      }
      let res = await statement.executeAsync({
        $title: list.title,
        $date: list.date.toISOString(),
        $color: list.color,
        $icon: list.icon,
        $serial: nextSerial + 1,
        $flagged: 0
      })
      console.log('[POST] List added successfully.')
    } catch (error) {
      console.log('Error while POST List : ', error)
    }
    finally {
      router.back()
    }
  }

  // Handling DateTimePicker modal
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false)
    if (selectedDate) {
      setList({...list, date: selectedDate})
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleWrapper}>
          <View style={[styles.titleIcon, { backgroundColor: list.color }]}>
              <MaterialCommunityIcons name={list.icon} style={styles.selectedIcon} />
          </View>
          <TextInput
            value={list.title}
            onChangeText={(text) => setList({...list, title: text})}
            placeholder='List Name'
            placeholderTextColor={'#B9B6B9'} 
            style={styles.inputTitleText}
          />
        </View>

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <View style={styles.dateWrapper}>
            <Text style={styles.dateText}>
              {list.date.toLocaleDateString('HU', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//, '.')}
            </Text>
            <MaterialCommunityIcons name="calendar-month-outline" style={styles.dateIcon} />
          </View>
        </TouchableOpacity>
        {showDatePicker && (<DateTimePicker value={list.date} is24Hour={true} mode={"date"} onChange={onChange} />)}

        <View style={styles.colorWrapper}>
          {colors.map((color, index) => {
            const isActive = selectedColor === colors[index]
            return (
              <View key={color}>
                <TouchableOpacity onPress={() => [setList({...list, color: colors[index]}), setSelectedColor(colors[index])]}>
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
            const isActive = selectedIcon === icons[index]
            return (
              <View key={icon}>
                <TouchableWithoutFeedback onPress={() => [setList({...list, icon: icons[index]}), setSelectedIcon(icons[index])]}>
                  <View style={[styles.iconCircle, isActive && { borderColor: '#494949' }]}>
                    <MaterialCommunityIcons name={icon} style={styles.icon} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )
          })}
        </View>
      </View>
      
      <TouchableOpacity onPress={postList}>
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