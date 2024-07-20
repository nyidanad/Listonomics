import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useRouter } from 'expo-router'

type ListProps = {
  title: string,
  icon: keyof typeof MaterialCommunityIcons.glyphMap,
  color: string
}

const List = ({ title, icon, color }: ListProps) => {
  const router = useRouter()

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={() => router.push({ pathname: 'home/lists/[id]', params: { title, color } })}>
        <View style={styles.listWrapper}>
          <View style={[styles.iconWrapper, { backgroundColor: color }]}>
            <MaterialCommunityIcons name={icon} style={styles.icon} />
          </View>
          <Text style={styles.listTitle}>{title}</Text>
          <Ionicons name="ellipsis-vertical" style={styles.listArrow} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 55,
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#B8BFCB',
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  listWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  iconWrapper: {
    borderRadius: 999,
    width: 35,
    height: 35,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    color: 'white',
  },
  listTitle: {
    flex: 1,
    fontSize: 16,
  },
  listArrow: {
    fontSize: 18,
    color: '#C0C0C0',
  },
})

export default List