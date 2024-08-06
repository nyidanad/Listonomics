import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'

import Searchbar from '../../../components/search/searchbar'
import ListFilter from '../../../components/filter/list-filter'
import ListComponent from '../../../components/list/list'

export type List = {
  lid: number
  title: string
  date: string
  color: string
  icon: keyof typeof MaterialCommunityIcons.glyphMap
  serial?: number
  flagged: number
}

export const Home = () => {
  const db = useSQLiteContext()
  const router = useRouter()
  const navigation = useNavigation()
  const [lists, setLists] = useState<List[]>([])

  // Fetching List table
  const getLists = async () => {
    try {
      const allRows: List[] = await db.getAllAsync('SELECT * FROM Lists')
      setLists(allRows)
      console.log('[GET] Lists fetched successfully.')
    } catch (error) {
      console.error('Error while fetching List : ', error)
    }
  }

  // Loading all lists
  useEffect(() => {
    const loadLists = navigation.addListener('focus', () => getLists())
    return loadLists
  }, [navigation])


  return (
    <View style={styles.container}>
      <Searchbar />
      <View style={styles.filters}>
        <ListFilter title='All' icon='albums' quantity={42} backgroundColor='#404040' />
        <ListFilter title='Today' icon='calendar-sharp' quantity={1} backgroundColor='#5A75E4' />
        <ListFilter title='Flagged' icon='flag-sharp' quantity={5} backgroundColor='#FBC116' />
      </View>

      <View style={styles.listsHeader}>
        <Text style={styles.title}>My Lists</Text>
        <Ionicons name="options" style={styles.settingsIcon} />
      </View>
      <View style={{ maxHeight: '65%', flex: 1 }}>
        {lists.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>SUCH EMPTINESS</Text>
            <Text style={styles.emptyMessage}>Create your first shopping list!</Text>
          </View>
        ) :
          <FlatList 
            data={lists}
            keyExtractor={(item) => item.lid.toString()}
            renderItem={({ item, index }) => (
              <ListComponent list={item} index={index} getLists={getLists} />
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
    top: 25,
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