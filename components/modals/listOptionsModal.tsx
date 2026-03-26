import React, { Dispatch, SetStateAction, useState } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import { useRouter } from 'expo-router'

import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import { supabase } from '../../utils/supabase'
import { List } from '../../app/(tabs)/home'
import Hr from '../horizontalRules/hr'
import DeleteModal from './deleteModal'
import { Colors } from '../../constants/colors'

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

const ListOptionsModal = ({ showModal, setShowModal, modalPosition, selectedList, getLists }: ModalProps) => {
  const colorScheme = useColorScheme()
  
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  // Handeling Modal close
  const onCloseModal = () => {
    setShowModal(false)
  }

  // DUPLICATE List
  const dupList = async (list: List) => {
    try {
      let nextTitle = list.title.replace(/\s\(\d+\)$/, "")
      let count = 2

      // get existing titles
      const { data, error } = await supabase
        .from('lists')
        .select('title')

      if (error) throw error

      data?.forEach((row) => {
        if (row.title.startsWith(nextTitle)) {
          const version = row.title.match(/\((\d+)\)$/)
          if (version) {
            count = Math.max(count, parseInt(version[1]) + 1)
          }
        }
      })

      nextTitle = `${nextTitle} (${count})`

      const { error: insertError } = await supabase
        .from('lists')
        .insert([
          {
            title: nextTitle,
            color: list.color,
            icon: list.icon,
            scheduled: list.scheduled,
            flagged: list.flagged,
            uid: list.uid
          }
        ])

      if (insertError) throw insertError

      console.log('[POST] List duplicated successfully.')

    } catch (error) {
      console.error('Error while DUPLICATE List:', error)
    } finally {
      getLists()
      onCloseModal()
    }
  }

  // FLAGGED List
  const flagList = async (id: number, flag: number) => {
    try {
      const newFlag = flag ? false : true

      const { error } = await supabase
        .from('lists')
        .update({ flagged: newFlag })
        .eq('id', id)

      if (error) throw error

      console.log('[PUT] List flag updated successfully.')

    } catch (error) {
      console.error('Error while FLAGGED List:', error)
    } finally {
      getLists()
    }
  }

  // DELETE List
  const delList = async (id: number) => {
    try {
      const { error } = await supabase
        .from('lists')
        .delete()
        .eq('id', id)

      if (error) throw error

      console.log('[DEL] List deleted successfully.')

    } catch (error) {
      console.error('Error while DEL List:', error)
    } finally {
      getLists()
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
        <View style={[styles.content, { top: modalPosition.top, backgroundColor: theme.modalBackground }]}>
          
          {/* EDIT */}
          <TouchableOpacity onPress={() => [onCloseModal, router.push({pathname: `home/editList/[id]`, params: { ...selectedList }})]}>
            <View style={styles.button}>
              <Text style={[styles.text, { color: theme.text }]}>Edit</Text>
              <MaterialCommunityIcons name="pencil-outline" style={[styles.icon, { color: theme.text }]} />
            </View>
          </TouchableOpacity>
          <Hr color={theme.ruler} width={1} top={8} bottom={8} />

          {/* DUPLICATE */}
          <TouchableOpacity onPress={() => dupList(selectedList)}>
            <View style={styles.button}>
              <Text style={[styles.text, { color: theme.text }]}>Duplicate</Text>
              <Ionicons name="duplicate-outline" style={[styles.icon, { color: theme.text }]} />
            </View>
          </TouchableOpacity>
          <Hr color={theme.ruler} width={1} top={8} bottom={8} />

          {/* FLAGGED */}
          <TouchableOpacity onPress={() => flagList(selectedList.id, selectedList.flagged)}>
            <View style={styles.button}>
              <Text style={[styles.text, { color: theme.text }]}>Flagged</Text>
              <Ionicons name={selectedList.flagged ? "flag-sharp" : "flag-outline"} style={[styles.icon, { color: theme.text }]} />
            </View>
          </TouchableOpacity>
          <Hr color={theme.ruler} width={1} top={8} bottom={8} />

          {/* SHARE */}
          <TouchableOpacity>
            <View style={styles.button}>
              <Text style={[styles.text, { color: theme.text }]}>Share</Text>
              <Ionicons name={'person-add-outline'} style={[styles.icon, { color: theme.text }]} />
            </View>
          </TouchableOpacity>
          <Hr color={theme.ruler} width={1} top={8} bottom={8} />

          {/* DELETE */}
          <TouchableOpacity onPress={() => setShowDeleteModal(true)}>
            <View style={styles.button}>
              <Text style={[styles.text, { color: '#FB3D3D' }]}>Delete</Text>
              <Ionicons name="trash" style={[styles.icon, { color: '#FB3D3D' }]} />
            </View>
          </TouchableOpacity>

          <DeleteModal 
            showModal={showDeleteModal} 
            setShowModal={setShowDeleteModal} 
            title='Are you sure?' 
            message='The list will be permanently deleted and cannot be restored.'
            button='Delete'
            request={() => delList(selectedList.id)}
          />

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
    fontSize: 16,
  },
  icon: {
    fontSize: 18,
  },
})

export default ListOptionsModal