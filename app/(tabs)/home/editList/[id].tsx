import { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { router, useLocalSearchParams } from 'expo-router'

import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker"
import { useSQLiteContext } from 'expo-sqlite'

import assets from '../../../../data/assets.json'
import { List } from '..'
import CustomHeader from '../../../../components/header/customHeader'

type iconType = keyof typeof Ionicons.glyphMap

const editList = () => {
  const db = useSQLiteContext()
  const colors = assets.colors
  const icons = assets.icons as iconType[]
  // @ts-ignore
  const selectedList = useLocalSearchParams<List>()
  
  const [list, setList] = useState<List>(selectedList)
  const [selectedColor, setSelectedColor] = useState(list.color)
  const [selectedIcon, setSelectedIcon] = useState(list.icon)
  const [showDatePicker, setShowDatePicker] = useState(false)

  // UPDATE List
  const putList = async () => {
    const statement = await db.prepareAsync('UPDATE Lists SET title = $title, date = $date, color = $color, icon = $icon WHERE lid = $lid')

    try {
      let res = await statement.executeAsync({
        $lid : list.lid,
        $title: list.title,
        $date: list.date,
        $color: list.color,
        $icon: list.icon
      })
      console.log('[PUT] List updated successfully.')
    } catch (error) {
      console.log('Error while PUT List : ', error)
    }
    finally {
      router.back()
    }
  }

  // Handling DateTimePicker modal
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false)
    if (selectedDate) {
      setList({...list, date: selectedDate.toISOString()})
    }
  }

  return (
    <>
      <CustomHeader title='Edit List' backTo='Home' action='Save' onPress={putList} />
      
      <View style={styles.container}>
        <View>
          { /* TITLE */ }
          <View style={styles.titleWrapper}>
            <View style={[styles.titleIcon, { backgroundColor: list.color }]}>
                <Ionicons name={list.icon} style={styles.selectedIcon} />
            </View>
            <TextInput
              value={list.title}
              onChangeText={(text) => setList({...list, title: text})}
              placeholder='List Name'
              placeholderTextColor={'#AFAFAF'} 
              style={styles.inputTitleText}
            />
          </View>

          { /* DATETIMEPICKER */ }
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateContainer}>
            <View style={styles.dateWrapper}>
              <Ionicons name="calendar-outline" size={32} color={'#363636'} style={{ marginRight: 10 }} />
              <View>
                <Text style={styles.dateLabel}>Schedule List</Text>
                <Text style={styles.dateText}>
                  {new Date(list.date).toLocaleDateString('HU', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//, '.')}
                </Text>
              </View>
            </View>
            <Entypo name="select-arrows" size={22} color={'#363636'} />
          </TouchableOpacity>
          {showDatePicker && (<DateTimePicker value={new Date(list.date)} is24Hour={true} mode={"date"} onChange={onChange} />)}

          { /* COLORS */ }
          <View style={styles.wrapper}>
            {colors.map((color, index) => {
              const isActive = selectedColor === colors[index]
              return (
                <View key={color}>
                  <TouchableOpacity onPress={() => [setList({...list, color: colors[index]}), setSelectedColor(colors[index])]}>
                    <View style={[styles.circle, { backgroundColor: color }]}>
                      {isActive && <View style={styles.innerCircle} />}
                    </View>
                  </TouchableOpacity>
                </View>
              )
            })}
            <TouchableOpacity style={[styles.circle, { backgroundColor: '#F5F5F5', }]}>
              <Ionicons name={'add-sharp'} size={24} color={'#363636'} />
            </TouchableOpacity>
          </View>

          { /* ICONS */ }
          <View style={styles.wrapper}>
            {icons.map((icon, index) => {
              const isActive = selectedIcon === icons[index]
              return (
                <View key={icon}>
                  <TouchableOpacity onPress={() => [setList({...list, icon: icons[index]}), setSelectedIcon(icons[index])]}>
                    <View style={[styles.circle, isActive && { backgroundColor: selectedColor+'20' }]}>
                      <Ionicons name={icon} style={[styles.icon, isActive && { color: selectedColor }]} />
                    </View>
                  </TouchableOpacity>
                </View>
              )
            })}
            <TouchableOpacity style={[styles.circle, { backgroundColor: '#F5F5F5', }]}>
              <Ionicons name={'add-sharp'} size={24} color={'#363636'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  titleWrapper: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-around',
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
    marginBottom: 15,
  },
  selectedIcon: {
    fontSize: 55,
    color: '#FFF',
  },
  inputTitleText: {
    backgroundColor: '#FAFAFA',
    width: '100%',
    height: 50,
    color: '#363636',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    borderRadius: 10,
  },
  
  dateContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateLabel: {
    color: '#B3B3B3',
    fontSize: 12,
  },
  dateText: {
    color: '#363636',
    fontSize: 16,
    fontWeight: 'bold',
  },

  wrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 999,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 20,
    height: 20,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
  },
  icon: {
    fontSize: 24,
    color: '#989CA9',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    backgroundColor: 'red',
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  },
})

export default editList