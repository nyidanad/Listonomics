import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useRef, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

import Item from "../../../../components/item/item"
import Hr from "../../../../components/horizontalRules/hr"
import BottomSheet from '../../../../components/bottomSheet/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

type ListProps = {
  title: string,
  color: string,
}

const ListPage = () => {
  const [totalSum, setTotalSum] = useState(0)
  const [cartSum, setCartSum] = useState(0)
  const { title, color } = useLocalSearchParams() as ListProps
  const bottomSheetRef = useRef<BottomSheetModal>(null)

  // Handeling BottomSheet
  const handleSheetOpen = () => { bottomSheetRef.current?.present() }
  const handleSheetClose = () => { bottomSheetRef.current?.close() }

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <View>
          <View style={styles.titleWrapper}>
            <Text style={[styles.title, {color: color}]}>{title}</Text>
            <TouchableOpacity>
              <Ionicons name='options' style={[styles.optionsIcon, { backgroundColor: color, }]} />
            </TouchableOpacity>
          </View>
          <Text style={styles.summaryTitle}>SUMMARY</Text>
          <Text style={styles.summaryCost}>Total:      {totalSum}Ft</Text>
          <Text style={styles.summaryCost}>In Cart:    {cartSum}Ft</Text>
          <Hr color='#F6F6F6' width={1} top={8} />
          
          <View style={{ height: '76%' }}>
            <Text style={[styles.categoryHeader, { color: color }]}>Food</Text>
            <Item name='item1' price={1000000} quantity={2} checked={false} color={color} />
            <Item name='item2' price={125} quantity={3} checked={true} color={color} />
            <Item name='item3' price={150} quantity={5} checked={true} color={color} />
            <Item name='item4' price={125} quantity={1} checked={false} color={color} />
            <Text style={[styles.categoryHeader, { color: color }]}>Drink</Text>
            <Item name='item5' price={100} quantity={6} checked={false} color={color} />
            <Item name='item6' price={125} quantity={2} checked={true} color={color} />
          </View>
        </View>

        <View style={styles.addItemWrapper}>
          <TouchableOpacity onPress={handleSheetOpen}>
            <View style={styles.addItemWrapper}>
              <Ionicons name="add-circle" style={[styles.addItemIcon, {color: color}]} />
              <Text style={[styles.addItemText, {color: color}]}>New Item</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <BottomSheet title='Add Item' color={color} onClose={handleSheetClose} ref={bottomSheetRef} />
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
  }, 
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  optionsIcon:{
    fontSize: 19,
    color: '#FFF',
    borderRadius: 8,
    padding: 6,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#363636',
  },
  summaryCost: {
    fontSize: 15,
    color: '#363636',
  },
  
  addItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999,
    bottom: 2,
  },
  addItemIcon: {
    fontSize: 32,
    marginRight: 8,
  },
  addItemText: {
    fontSize: 17,
    fontWeight: '500',
  },
  categoryHeader: {
    fontSize: 22,
    marginVertical: 12,
  },
})

export default ListPage