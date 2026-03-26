import React, { Dispatch, SetStateAction } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicons from '@expo/vector-icons/Ionicons'

import Hr from '../horizontalRules/hr'
import { Order } from '../../app/(tabs)/home'
import { Colors } from '../../constants/colors'

type ModalProps = {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  order: Order
  setOrder: Dispatch<SetStateAction<Order>>
}

const ListOptionsModal = ({ showModal, setShowModal, order, setOrder }: ModalProps) => {
  const colorScheme = useColorScheme()
  
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  // Handeling Modal close
  const onCloseModal = () => {
    setShowModal(false)
  }

  // Handeling order changes
  const handleOrderChange = async (newOrderBy: string) => {
    let newOrderWay = 'ASC'
    
    if(newOrderBy === order.orderBy) {
      if(order.orderWay === 'ASC') {
        newOrderWay = 'DESC'
      }
      setOrder({orderBy: newOrderBy, orderWay: newOrderWay})
    }
    else {
      setOrder({orderBy: newOrderBy, orderWay: newOrderWay})
    }

    await AsyncStorage.setItem('orderBy', newOrderBy)
    await AsyncStorage.setItem('orderWay', newOrderWay)
  }


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
    >
      <TouchableOpacity style={{ flex: 1 }} onPress={onCloseModal}>
        <View style={[styles.container, { backgroundColor: theme.modalBackground }]}>

            {/* HEADER */}
            <View style={styles.header}>
              <View style={styles.headerWrapper}>
                <Ionicons name="swap-vertical" style={styles.icon} color={theme.text} />
                <View>
                  <Text style={[styles.headerTitle, { color: theme.text }]}>Sorting aspect</Text>
                  <Text style={[styles.headerOrderBy, { color: theme.order }]}>{order.orderBy} ({order.orderWay})</Text>
                </View>
              </View>
            </View>
            <Hr color={theme.ruler} width={1} top={8} bottom={8} />
            
            {/* ALPHABETICAL */}
            <TouchableOpacity onPress={() => handleOrderChange('Alphabetical')}>
              <View style={styles.button}>
                {order.orderBy === 'Alphabetical' ? <MaterialCommunityIcons name="check" style={styles.icon} color={theme.text} /> : <View style={styles.emptyIconSpace} />}
                <Text style={{ color: theme.text }}>Alphabetical</Text>
              </View>
            </TouchableOpacity>
            <Hr color={theme.ruler} width={1} top={8} bottom={8} />

            {/* DATE */}
            <TouchableOpacity onPress={() => handleOrderChange('Date')}>
              <View style={styles.button}>
                {order.orderBy === 'Date' ? <MaterialCommunityIcons name="check" style={styles.icon} color={theme.text} /> : <View style={styles.emptyIconSpace} />}
                <Text style={{ color: theme.text }}>Date</Text>
              </View>
            </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 5,
    right: 10,
    top: 245,
    width: 190,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 18,
    color: '#363636',
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  headerOrderBy: {
    fontSize: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    marginRight: 15,
  },
  emptyIconSpace: {
    width: 18,
    height: 18,
    marginLeft: 15
  },
})

export default ListOptionsModal