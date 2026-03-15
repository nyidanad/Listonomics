import React, { useContext, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'

import Ionicons from '@expo/vector-icons/Ionicons'
import Octicons from '@expo/vector-icons/Octicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { supabase } from '../../../utils/supabase'

import { AuthContext } from '../../../utils/authContext'
import Searchbar from '../../../components/search/searchbar'
import ListFilter from '../../../components/filter/list-filter'
import ListComponent from '../../../components/list/list'
import DraggableListComponent from '../../../components/list/draggableList'
import ListOrderModal from '../../../components/modals/listOrderModal'
import { SafeAreaView } from 'react-native-safe-area-context'

export type List = {
  id: number
  title: string
  color: string
  icon: keyof typeof Ionicons.glyphMap
  scheduled: string
  serial?: number
  flagged: number
  uid: string
}

export type Order = {
  orderBy: string
  orderWay: string
}

export const Home = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter()
  const navigation = useNavigation()
  const [lists, setLists] = useState<List[]>([])
  const [allFilter, setAllFilter] = useState(0)
  const [todayFilter, setTodayFilter] = useState(0)
  const [flaggedFilter, setFlaggedFilter] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('')
  const [order, setOrder] = useState<Order>({orderBy: 'Alphabetical', orderWay: 'ASC'})
  const [mode, setMode] = useState('normal')
  const [showOrderModal, setShowOrderModal] = useState(false)

  // Fetching List table
  const getLists = async (filter: string) => {
    if (!user) return;

    try {
      let query = supabase.from('lists').select('*').eq('uid', user.id)

      if (filter === 'Today') {
        const today = new Date().toISOString().split('T')[0]

        query = query
          .gte('scheduled', `${today}T00:00:00`)
          .lt('scheduled', `${today}T23:59:59`)
      }

      if (filter === 'Flagged') {
        query = query.eq('flagged', true)
      }

      if (order.orderBy === 'Alphabetical') {
        query = query.order('title', { ascending: order.orderWay === 'ASC' })
      }

      if (order.orderBy === 'Date') {
        query = query.order('scheduled', { ascending: order.orderWay === 'ASC' })
      }

      if (order.orderBy === 'Custom') {
        query = query.order('serial', { ascending: order.orderWay === 'ASC' })
      }

      const { data, error } = await query

      if (error) throw error

      setLists(data || [])

      const all = data?.length || 0
      const todayCount = data?.filter(row => {
        const today = new Date().toISOString().split('T')[0]
        const scheduledDate = row.scheduled.split('T')[0]
        return scheduledDate === today
      }).length || 0

      const flaggedCount = data?.filter(row => row.flagged === true).length || 0

      setAllFilter(all)
      setTodayFilter(todayCount)
      setFlaggedFilter(flaggedCount)

      setSearchQuery('')
      console.log('[GET] Lists fetched successfully.')
    } catch (error) {
      console.error('Error fetching lists from Supabase:', error)
    }
  }

  // Loading all lists by filter: ['All', 'Today', 'Flagged']
  useEffect(() => {
    const loadLists = () => getLists(filter)
    loadLists()
    const unsubscribe = navigation.addListener('focus', loadLists)
    return () => unsubscribe()
  }, [navigation, filter, order])

  // Filter Lists to seachbar
  const filteredLists = lists.filter(item => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase())
  })


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.profile} onPress={() => router.push('home/profile')}>
          <Image
            style={styles.image}
            source={require("../../../assets/windows.png")}
          />
          <View>
            <Text style={styles.welcome}>Welcome Back! 👋</Text>
            <Text style={styles.name}>{user?.name}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.buttons}>
          <TouchableOpacity>
            <Ionicons name='notifications-outline' style={[styles.headerIcon, {marginLeft: 10}]} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <Searchbar placeholder="Find your list..." searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <View style={styles.filters}>
          <ListFilter title='All' icon='albums' quantity={allFilter} backgroundColor='#404040' setFilter={setFilter} />
          <ListFilter title='Today' icon='calendar-sharp' quantity={todayFilter} backgroundColor='#5A75E4' setFilter={setFilter} />
          <ListFilter title='Flagged' icon='flag-sharp' quantity={flaggedFilter} backgroundColor='#FBC116' setFilter={setFilter} />
        </View>

        <View style={styles.listsHeader}>
          <Text style={styles.title}>My Lists</Text>
          <View style={styles.settingsWrapper}>
            {mode === 'normal' ? (
              <>
                <Text style={styles.settingsText}>{order.orderBy}</Text>
                {order.orderWay === 'ASC' ? (
                  <TouchableOpacity onPress={() => setShowOrderModal(true)}>
                    <Octicons name="sort-asc" style={styles.settingsIcon} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => setShowOrderModal(true)}>
                    <Octicons name="sort-desc" style={styles.settingsIcon} />
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <TouchableOpacity onPress={() => setMode('normal')}>
                <Text style={{ color: '#007AFF' }}>Save</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.listContainer}>
          {lists.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>SUCH EMPTINESS</Text>
              <Text style={styles.emptyMessage}>Create your first shopping list!</Text>
            </View>
          ) :
            <FlatList 
              data={filteredLists}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingBottom: 80 }}
              renderItem={({ item, index }) => (
                mode === 'normal'
                ? 
                  <ListComponent list={item} setMode={setMode} />
                :
                  <DraggableListComponent list={item} index={index} getLists={() => getLists(filter)} />
              )}
            />
          }
        </View>
        
        <TouchableOpacity onPress={() => router.push('home/addList')} style={styles.addListWrapper}>
          <Ionicons name="add-circle-sharp" style={styles.addListIcon} />
        </TouchableOpacity>
      </View>

      <ListOrderModal showModal={showOrderModal} setShowModal={setShowOrderModal} order={order} setOrder={setOrder} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    maxHeight: 50,
    maxWidth: 50,
    resizeMode: 'contain',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 2,
    borderRadius: 999,
    marginRight: 10,
  },
  welcome: {
    color: '#989CA9',
    fontSize: 12,
  },
  name: {
    color: '#363636',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    color: '#007AFF',
    fontSize: 18,
    borderRadius: 999,
    borderColor: 'rgba(118, 118, 128, 0.12)',
    borderWidth: 2,
    padding: 6,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  listsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#363636',
  },
  settingsWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  settingsText: {
    fontSize: 10,
    color: '#ADADAD',
    marginRight: 10,
  },
  settingsIcon: {
    fontSize: 24,
    color: '#363636',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 25,
  },

  listContainer: {
    flex: 1,
  },

  addListWrapper: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 20,
    paddingHorizontal: 14,
    zIndex: 999,
  },
  addListIcon: {
    fontSize: 65,
    color: 'rgba(0, 122, 255, 0.85)',
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    color: '#DEDEDE',
  },
  emptyMessage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#DEDEDE',
  },
})

export default Home