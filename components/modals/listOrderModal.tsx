import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { Dispatch, SetStateAction } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

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
  const handleOrderChange = (newOrderBy: string) => {
    let newOrderWay = ''
    
    if(newOrderBy === order.orderBy) {
      if(order.orderWay === 'ASC') {
        newOrderWay = 'DESC'
      }
      else {
        newOrderWay = 'ASC'
      }
      setOrder({orderBy: newOrderBy, orderWay: newOrderWay})
    }
    else {
      setOrder({orderBy: newOrderBy, orderWay: 'ASC'})
    }
  }


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={onCloseModal}
    >
      <TouchableOpacity style={styles.container} onPress={onCloseModal}>
        <View style={[styles.content]}>

          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.headerWrapper}>
              <Ionicons name="swap-vertical" style={styles.headerIcon} />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.headerTitle}>Sorting aspect</Text>
                <Text style={styles.headerOrderBy}>{order.orderBy}</Text>
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
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  content: {
    justifyContent: 'space-evenly',
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 5,
    width: 210,
    height: 'auto',
    bottom: 125,
    left: 5,
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
    fontSize: 20,
    color: '#363636',
  },
  headerTitle: {
    fontSize: 16,
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
    fontSize: 16,
  },
  icon: {
    color: '#363636',
    fontSize: 20,
    marginRight: 8,
  },
  iconAlphabetical: {
    color: '#363636',
    marginRight: 8,
  },
  emptyIconSpace: {
    width: 20,
    height: 20,
    marginLeft: 8
  },
})

export default ListOptionsModal