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
            <MaterialCommunityIcons name={icon} style={[styles.icon, { backgroundColor: color }]} />
          </View>
          <Text style={styles.listTitle}>{title}</Text>
          <Ionicons name="chevron-forward" style={styles.listArrow} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F2F8',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 60,
    justifyContent: 'center',
    marginTop: 15,
  },
  listWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  iconWrapper: {
    borderRadius: 999,
    width: 40,
    height: 40,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 22,
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