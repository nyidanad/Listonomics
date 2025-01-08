import React, { Dispatch, SetStateAction } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicons from '@expo/vector-icons/Ionicons'

import Hr from '../horizontalRules/hr'
import { Order } from '../../app/(tabs)/home'

type ModalProps = {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  order: Order
  setOrder: Dispatch<SetStateAction<Order>>
}

const ListOptionsModal = ({ showModal, setShowModal, order, setOrder }: ModalProps) => {

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
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
              <View style={styles.headerWrapper}>
                <Ionicons name="swap-vertical" style={styles.icon} />
                <View>
                  <Text style={styles.headerTitle}>Sorting aspect</Text>
                  <Text style={styles.headerOrderBy}>{order.orderBy} ({order.orderWay})</Text>
                </View>
              </View>
            </View>
            <Hr color='#EDEEF2' width={1} top={8} bottom={8} />
            
            {/* ALPHABETICAL */}
            <TouchableOpacity onPress={() => handleOrderChange('Alphabetical')}>
              <View style={styles.button}>
                {order.orderBy === 'Alphabetical' ? <MaterialCommunityIcons name="check" style={styles.icon} /> : <View style={styles.emptyIconSpace} />}
                <Text style={styles.text}>Alphabetical</Text>
              </View>
            </TouchableOpacity>
            <Hr color='#EDEEF2' width={1} top={8} bottom={8} />

            {/* DATE */}
            <TouchableOpacity onPress={() => handleOrderChange('Date')}>
              <View style={styles.button}>
                {order.orderBy === 'Date' ? <MaterialCommunityIcons name="check" style={styles.icon} /> : <View style={styles.emptyIconSpace} />}
                <Text style={styles.text}>Date</Text>
              </View>
            </TouchableOpacity>
            <Hr color='#EDEEF2' width={1} top={8} bottom={8} />

            {/* CUSTOM */}
            <TouchableOpacity onPress={() => handleOrderChange('Custom')}>
              <View style={styles.button}>
                {order.orderBy === 'Custom' ? <MaterialCommunityIcons name="check" style={styles.icon} /> : <View style={styles.emptyIconSpace} />}
                <Text style={styles.text}>Custom</Text>
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
    backgroundColor: '#FFF',
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
    color: '#363636',
  },
  headerOrderBy: {
    color: '#DADADA',
    fontSize: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#363636',
  },
  icon: {
    color: '#363636',
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