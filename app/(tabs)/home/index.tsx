import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Searchbar from '../../../components/search/searchbar'
import ListFilter from '../../../components/filter/list-filter'
import List from '../../../components/list/list'

export const Home = () => {
  const router = useRouter()

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
        <List title='Weekend List' icon='format-list-bulleted' color='#BB6CD7' />
        <List title='Shopping List' icon='cart' color='#0570FF' />
        <List title='Kids' icon='baby-carriage' color='#FFC602' />
        <List title='Finance' icon='cash-multiple' color='#18C04E' />
        <List title='Groceries' icon='format-list-bulleted' color='#FF342D' />
        <List title='Birthday Party' icon='cake-variant' color='#FF8A04' />
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
    fontWeight: '500',
    color: '#4AA0F1',
  },
})

export default Home