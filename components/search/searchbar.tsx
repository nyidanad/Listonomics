import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, TextInput, View } from "react-native";

const searchbar = () => {
  return (
    <View style={styles.search}>
      <Ionicons name="search" style={styles.searchIcon} />
      <TextInput placeholder="Search" style={styles.searchText} />
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    height: 38,
    backgroundColor: '#EDEEF2',
    borderRadius: 999,
    paddingHorizontal: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    color: '#808080',
    marginRight: 8,
    fontSize: 18,
  },
  searchText: {
    color: '#808080',
    fontSize: 15,
  },
})

export default searchbar;
