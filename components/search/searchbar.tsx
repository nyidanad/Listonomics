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
      <TextInput placeholder={placeholder} placeholderTextColor={'rgba(0, 0, 0, 0.3)'} style={styles.searchText} value={searchQuery} onChangeText={(text) => setSearchQuery(text)} />
    </View>
  )
}

const styles = StyleSheet.create({
  search: {
    height: 38,
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    color: 'rgba(0, 0, 0, 0.08)',
    marginRight: 8,
    fontSize: 18,
  },
  searchText: {
    color: '#363636',
    fontSize: 15,
  },
})

export default Searchbar
