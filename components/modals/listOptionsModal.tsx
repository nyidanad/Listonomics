import React, { Dispatch, SetStateAction } from 'react'
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'

import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useSQLiteContext } from 'expo-sqlite'

import { List } from '../../app/(tabs)/home'
import Hr from '../horizontalRules/hr'

export type ModalPositionsProps = {
  top: number
}

type ModalProps = {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  modalPosition: ModalPositionsProps
  selectedList: List
  getLists: () => Promise<void>
}

type SQLRow = {
  title: string
  serial: string
}

const ListOptionsModal = ({ showModal, setShowModal, modalPosition, selectedList, getLists }: ModalProps) => {
  const db = useSQLiteContext()
  const router = useRouter()

  // Handeling Modal close
  const onCloseModal = () => {
    setShowModal(false)
  }

  // DUPLICATE List
  const dupList = async (list: List) => {
    const statement = await db.prepareAsync('INSERT INTO Lists (title, date, color, icon, serial, flagged) VALUES ($title, $date, $color, $icon, $serial, $flagged)')
    let nextTitle: string = list.title.replace(/\s\(\d+\)$/, "")
    let nextSerial: number = 0
    let count: number = 2

    try {
      // get highest serial number
      for await (const row of db.getEachAsync<SQLRow>('SELECT serial FROM Lists')) {
        const serial = parseInt(row.serial)
        if(serial >= nextSerial) {
          nextSerial = serial
        }
      }

      // get highest version of the same titled List
      for await (const row of db.getEachAsync<SQLRow>('SELECT title FROM Lists')) {
        const checkTitle = row.title

        if (checkTitle.startsWith(nextTitle)) {
          const version = checkTitle.match(/\((\d+)\)$/)
          
          if (version) {
            count = Math.max(count, parseInt(version[1]) + 1)
          }
        }
      }
      nextTitle = `${nextTitle} (${count})`

      let res = await statement.executeAsync({
        $title: nextTitle,
        $date: list.date,
        $color: list.color,
        $icon: list.icon,
        $serial: nextSerial + 1,
        $flagged: list.flagged
      })
      console.log('[POST] List duplicated successfully.')
    } catch (error) {
      console.error('Error while DUPLICATE List : ', error)
    } finally {
      getLists()
      onCloseModal()
    }
  }

  // FLAGGED List
  const flagList = async (lid: number, flag: number) => {
    try {
      if(flag === 0) {
        flag = 1
      } else {
        flag = 0
      }
      await db.runAsync('UPDATE Lists SET flagged = ? WHERE lid = ?', flag, lid)
      console.log('[PUT] List flag updated successfully.')
    } catch (error) {
      console.error('Error while FLAGGED List : ', error)
    } finally {
      getLists()
    }
  }

  // DELETE List
  const delList = async (lid: number) => {
    try {
      Alert.alert('Delete List', 'Are you sure want to delete this list?', [
        {
          text: 'Cancel'
        },
        {
          text: 'Confirm',
          onPress: () => {
            db.runAsync('DELETE FROM Lists WHERE lid = ?', lid)
            console.log('[DEL] List deleted successfully.')
            getLists()
          }
        }
      ])
    } catch (error) {
      console.error('Error while DEL List : ', error)
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
        <View style={[styles.content, { top: modalPosition.top }]}>
          
          {/* EDIT */}
          <TouchableOpacity onPress={() => [onCloseModal, router.push({pathname: `home/editList/[id]`, params: { ...selectedList }})]}>
            <View style={styles.button}>
              <Text style={styles.text}>Edit</Text>
              <MaterialCommunityIcons name="pencil-outline" style={styles.icon} />
            </View>
          </TouchableOpacity>
          <Hr color='#EDEEF2' width={1} top={8} bottom={8} />

          {/* DUPLICATE */}
          <TouchableOpacity onPress={() => dupList(selectedList)}>
            <View style={styles.button}>
              <Text style={styles.text}>Duplicate</Text>
              <Ionicons name="duplicate-outline" style={styles.icon} />
            </View>
          </TouchableOpacity>
          <Hr color='#EDEEF2' width={1} top={8} bottom={8} />

          {/* FLAGGED */}
          <TouchableOpacity onPress={() => flagList(selectedList.lid, selectedList.flagged)}>
            <View style={styles.button}>
              <Text style={styles.text}>Flagged</Text>
              <Ionicons name={selectedList.flagged === 0 ? "flag-outline" : "flag-sharp"} style={styles.icon} />
            </View>
          </TouchableOpacity>
          <Hr color='#EDEEF2' width={1} top={8} bottom={8} />

          {/* SHARE */}
          <TouchableOpacity>
            <View style={styles.button}>
              <Text style={styles.text}>Share</Text>
              <Ionicons name={'person-add-outline'} style={styles.icon} />
            </View>
          </TouchableOpacity>
          <Hr color='#EDEEF2' width={1} top={8} bottom={8} />

          {/* DELETE */}
          <TouchableOpacity onPress={() => delList(selectedList.lid)}>
            <View style={styles.button}>
              <Text style={[styles.text, { color: 'red' }]}>Delete</Text>
              <Ionicons name="trash" style={[styles.icon, { color: 'red' }]} />
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 5,
    width: 175,
    height: 'auto',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#363636',
    fontSize: 16,
  },
  icon: {
    color: '#363636',
    fontSize: 18,
  },
})

export default ListOptionsModal