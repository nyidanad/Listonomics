import { useContext, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from "react-native"
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker"
import { useSQLiteContext } from 'expo-sqlite'

import { supabase } from '../../../utils/supabase'
import { AuthContext } from '../../../utils/authContext'
import assets from '../../../data/assets.json'
import CustomHeader from '../../../components/header/customHeader'
import { Colors } from '../../../constants/colors'

type iconType = keyof typeof Ionicons.glyphMap

type List = {
  title: string
  scheduled: Date
  color: string
  icon: keyof typeof Ionicons.glyphMap
}

const addList = () => {
  const colorScheme = useColorScheme()
  
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  const { user } = useContext(AuthContext);
  const colors = assets.colors
  const icons = assets.icons as iconType[]
  
  const [list, setList] = useState<List>({ title: '', scheduled: new Date(), color: colors[3], icon: icons[1] })
  const [selectedColor, setSelectedColor] = useState(list.color)
  const [selectedIcon, setSelectedIcon] = useState(list.icon)
  const [showDatePicker, setShowDatePicker] = useState(false)

  // POST List
  const postList = async () => {
    if (!user) return

    try {
      // get highest serial
      const { data: serialData, error: serialError } = await supabase
        .from('lists')
        .select('serial')
        .eq('uid', user.id)
        .order('serial', { ascending: false })
        .limit(1)

      if (serialError) throw serialError

      const nextSerial = serialData?.length ? serialData[0].serial + 1 : 1

      const { error } = await supabase
        .from('lists')
        .insert({
          title: list.title,
          color: list.color,
          icon: list.icon,
          flagged: false,
          scheduled: list.scheduled.toISOString(),
          uid: user.id,
          serial: nextSerial
        })

      if (error) throw error

      console.log('[POST] List added successfully')

      router.back()

    } catch (error) {
      console.log('Error while POST List:', error)
    }
  }

  // Handling DateTimePicker modal
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false)
    if (selectedDate) {
      setList({...list, scheduled: selectedDate})
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <CustomHeader 
        title='Add List' 
        backTo='Home' 
        backToPath={'home'}
        action='Add' 
        onPress={postList} 
      />
      
      <View style={styles.container}>
        <View>
          { /* TITLE */ }
          <View style={[styles.titleWrapper, { backgroundColor: theme.list }]}>
            <View style={[styles.titleIcon, { backgroundColor: list.color }]}>
                <Ionicons name={list.icon} style={styles.selectedIcon} />
            </View>
            <TextInput
              value={list.title}
              onChangeText={(text) => setList({...list, title: text})}
              placeholder='List Name'
              placeholderTextColor={'#AFAFAF'} 
              style={[styles.inputTitleText, { backgroundColor: theme.listInput, color: theme.text }]}
            />
          </View>

          { /* DATETIMEPICKER */ }
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={[styles.dateContainer, { backgroundColor: theme.list }]}>
            <View style={styles.dateWrapper}>
              <Ionicons name="calendar-outline" size={32} color={theme.text} style={{ marginRight: 10 }} />
              <View>
                <Text style={styles.dateLabel}>Schedule List</Text>
                <Text style={[styles.dateText, { color: theme.text }]}>
                  {list.scheduled.toLocaleDateString('HU', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//, '.')}
                </Text>
              </View>
            </View>
            <Entypo name="select-arrows" size={22} color={theme.text} />
          </TouchableOpacity>
          {showDatePicker && (<DateTimePicker value={list.scheduled} is24Hour={true} mode={"date"} onChange={onChange} />)}

          { /* COLORS */ }
          <View style={[styles.wrapper, { backgroundColor: theme.list }]}>
            {colors.map((color, index) => {
              const isActive = selectedColor === colors[index]
              return (
                <View key={color}>
                  <TouchableOpacity onPress={() => [setList({...list, color: colors[index]}), setSelectedColor(colors[index])]}>
                    <View style={[styles.circle, { backgroundColor: color }]}>
                      {isActive && <View style={[styles.innerCircle, { backgroundColor: theme.list }]} />}
                    </View>
                  </TouchableOpacity>
                </View>
              )
            })}
            <TouchableOpacity style={[styles.circle, { backgroundColor: theme.listButtonBackground, }]}>
              <Ionicons name={'add-sharp'} size={24} color={theme.listButtonIcon} />
            </TouchableOpacity>
          </View>

          { /* ICONS */ }
          <View style={[styles.wrapper, { backgroundColor: theme.list }]}>
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
            <TouchableOpacity style={[styles.circle, { backgroundColor: theme.listButtonBackground, }]}>
              <Ionicons name={'add-sharp'} size={24} color={theme.listButtonIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  titleWrapper: {
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

export default addList