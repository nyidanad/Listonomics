import Ionicons from '@expo/vector-icons/Ionicons';
import { Dispatch, SetStateAction } from 'react';
import { StyleSheet, TextInput, View } from "react-native";

type SearchbarProps = {
  searchQuery: string
  setSearchQuery: Dispatch<SetStateAction<string>>
}

const Searchbar = ({ searchQuery, setSearchQuery }: SearchbarProps) => {
  return (
    <View style={styles.search}>
      <Ionicons name="search" style={styles.searchIcon} />
      <TextInput placeholder="Search" style={styles.searchText} value={searchQuery} onChangeText={(text) => setSearchQuery(text)} />
    </View>
  )
}

const styles = StyleSheet.create({
  search: {
    height: 38,
    backgroundColor: '#E5E5E5',
    borderRadius: 999,
    paddingHorizontal: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    color: '#6D6D6D',
    marginRight: 8,
    fontSize: 18,
  },
  searchText: {
    color: '#6D6D6D',
    fontSize: 15,
  },
})

export default Searchbar
