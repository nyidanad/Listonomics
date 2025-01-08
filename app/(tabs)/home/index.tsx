import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicons from '@expo/vector-icons/Ionicons'
import Octions from '@expo/vector-icons/Octicons'
import { useNavigation, useRouter } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'

import Searchbar from '../../../components/search/searchbar'
import ListFilter from '../../../components/filter/list-filter'
import ListComponent from '../../../components/list/list'
import ListOrderModal from '../../../components/modals/listOrderModal'

export type List = {
  lid: number
  title: string
  date: string
  color: string
  icon: keyof typeof MaterialCommunityIcons.glyphMap
  serial?: number
  flagged: number
}

export type Order = {
  orderBy: string
  orderWay: string
}

export const Home = () => {
  const db = useSQLiteContext()
  const router = useRouter()
  const navigation = useNavigation()
  const [lists, setLists] = useState<List[]>([])
  const [allFilter, setAllFilter] = useState(0)
  const [todayFilter, setTodayFilter] = useState(0)
  const [flaggedFilter, setFlaggedFilter] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('')
  const [order, setOrder] = useState<Order>({orderBy: 'Alphabetical', orderWay: 'ASC'})
  const [showOrderModal, setShowOrderModal] = useState(false)

  // Fetching List table
  const getLists = async (filter: string) => {
    let filterQuery = ''
    let orderQuery = ''
    let orderBy = await AsyncStorage.getItem('orderBy')
    let orderWay = await AsyncStorage.getItem('orderWay')

    if(orderBy === null || orderWay === null) {
      await AsyncStorage.setItem('orderBy', 'Alphabetical')                   // ** DEFAULT VALUE OF ORDER_BY **
      await AsyncStorage.setItem('orderWay', 'ASC')                           // ** DEFAULT VALUE OF ORDER_WAY **
    }
    console.log(order)

    try {
      // FILTER statements
      if(filter === 'Today') {
        filterQuery = ' WHERE STRFTIME("%Y-%m-%d", date) = STRFTIME("%Y-%m-%d", "now")'
      }
      else if(filter === 'Flagged') {
        filterQuery = ' WHERE flagged = 1'
      }

      // ORDER BY statements
      if(order.orderBy === 'Alphabetical') {
        orderQuery = ' ORDER BY title'
      }
      else if(order.orderBy === 'Date') {
        orderQuery = ' ORDER BY date'
      }
      else if(order.orderBy === 'Custom') {
        orderQuery = ' ORDER BY serial'
      }

      // ORDER WAY statement
      order.orderWay === 'ASC' ? orderQuery += ' ASC' : orderQuery += ' DESC'

      const allRows: List[] = await db.getAllAsync('SELECT * FROM Lists' + filterQuery + orderQuery)
      const all: any[] = await db.getAllAsync('SELECT COUNT(*) FROM Lists')
      const today: any[] = await db.getAllAsync('SELECT COUNT(*) FROM Lists WHERE STRFTIME("%Y-%m-%d", date) = STRFTIME("%Y-%m-%d", "now")')
      const flagged: any[] = await db.getAllAsync('SELECT COUNT(*) FROM Lists WHERE flagged = 1')
      
      setLists(allRows)
      setAllFilter(all[0]['COUNT(*)'])
      setTodayFilter(today[0]['COUNT(*)'])
      setFlaggedFilter(flagged[0]['COUNT(*)'])

      setSearchQuery('')
      console.log('[GET] Lists fetched successfully.')
    } catch (error) {
      console.error('Error while fetching List : ', error)
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
    <>
      <View style={styles.headerContainer}>
        <View style={styles.profile}>
          <Image
            style={styles.image}
            source={require("../../../assets/windows.png")}
          />
          <View>
            <Text style={styles.welcome}>Welcome Back! 👋</Text>
            <Text style={styles.name}>Nyíri Dániel</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity>
            <Ionicons name='person-add-outline' style={styles.headerIcon} />
          </TouchableOpacity>
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
            <Text style={styles.settingsText}>{order.orderBy}</Text>
            {order.orderWay === 'ASC' ?
              <TouchableOpacity onPress={() => setShowOrderModal(true)}>
                <Octions name="sort-asc" style={styles.settingsIcon} />
              </TouchableOpacity>
            :
              <TouchableOpacity onPress={() => setShowOrderModal(true)}>
                <Octions name="sort-desc" style={styles.settingsIcon} />
              </TouchableOpacity>
            }
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
              keyExtractor={(item) => item.lid.toString()}
              contentContainerStyle={{ paddingBottom: 80 }}
              renderItem={({ item, index }) => (
                <ListComponent list={item} index={index} getLists={() => getLists(filter)} />
              )}
            />
          }
        </View>
        
        <TouchableOpacity onPress={() => router.push('home/addList')} style={styles.addListWrapper}>
          <Ionicons name="add-circle-sharp" style={styles.addListIcon} />
        </TouchableOpacity>
      </View>

      <ListOrderModal showModal={showOrderModal} setShowModal={setShowOrderModal} order={order} setOrder={setOrder} />
    </>
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