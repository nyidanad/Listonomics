import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicons from '@expo/vector-icons/Ionicons'
import Octions from '@expo/vector-icons/Octicons'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
  const getLists = async (filter: string, order: Order) => {
    let filterQuery = ''
    let orderQuery = ''
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
      if(order.orderWay === 'ASC') {
        orderQuery += ' ASC'
      }
      else {
        orderQuery += ' DESC'
      }

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
    const loadLists = () => getLists(filter, order)
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
      <View style={styles.container}>
        <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
        <View style={{ maxHeight: '65%', flex: 1 }}>
          {lists.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>SUCH EMPTINESS</Text>
              <Text style={styles.emptyMessage}>Create your first shopping list!</Text>
            </View>
          ) :
            <FlatList 
              data={filteredLists}
              keyExtractor={(item) => item.lid.toString()}
              renderItem={({ item, index }) => (
                <ListComponent list={item} index={index} getLists={() => getLists(filter, order)} />
              )}
            />
          }
        </View>
        
        <TouchableOpacity onPress={() => router.push('home/addList')}>
          <View style={styles.addListWrapper}>
            <Ionicons name="add-circle-sharp" style={styles.addListIcon} />
            <Text style={styles.addListText}>Add List</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ListOrderModal showModal={showOrderModal} setShowModal={setShowOrderModal} order={order} setOrder={setOrder} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    paddingHorizontal: 20,
  },
  listsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
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
  addListWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999,
    top: 30,
  },
  addListIcon: {
    fontSize: 32,
    marginRight: 8,
    color: '#4AA0F1',
  },
  addListText: {
    fontSize: 17,
    color: '#4AA0F1',
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