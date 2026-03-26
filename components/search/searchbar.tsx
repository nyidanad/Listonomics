import Ionicons from '@expo/vector-icons/Ionicons';
import { Dispatch, SetStateAction } from 'react';
import { StyleSheet, TextInput, View } from "react-native";

type SearchbarProps = {
  placeholder: string
  searchQuery: string
  setSearchQuery: Dispatch<SetStateAction<string>>
}

const Searchbar = ({ placeholder, searchQuery, setSearchQuery }: SearchbarProps) => {
  return (
    <View style={styles.search}>
      <Ionicons name="search" style={styles.searchIcon} />
      <TextInput placeholder={placeholder} placeholderTextColor={'#A4A4A5'} style={styles.searchText} value={searchQuery} onChangeText={(text) => setSearchQuery(text)} />
    </View>
  )
}

const styles = StyleSheet.create({
  search: {
    height: 38,
    backgroundColor: '#7676801f',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    color: '#D7D7D8',
    marginRight: 8,
    fontSize: 22,
  },
  searchText: {
    color: '#363636',
    fontSize: 15,
  },
})

export default Searchbar
