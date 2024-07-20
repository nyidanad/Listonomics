import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type listFilterProps = {
  title: string,
  icon: keyof typeof Ionicons.glyphMap,
  quantity: number,
  backgroundColor: string
}

const listFilter = ({ title, icon, quantity, backgroundColor }: listFilterProps) => {
  return (
    <TouchableOpacity style={styles.filter}>
      <View style={styles.iconContainer}>
        <View style={[styles.icon, {backgroundColor}]}>
          <Ionicons style={styles.filterIcon} name={icon} />
        </View>
        <Text style={styles.filterTitle}>{title}</Text>
      </View>
      <View>
        <Text style={styles.filterNumber}>{quantity}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  filter: {
    width: '31%', 
    height: 60,
    borderRadius: 15,
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  iconContainer: {
    justifyContent: 'space-between',
  },
  icon: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  filterIcon: {
    fontSize: 20,
    color: '#FFF',
  },
  filterTitle: {
    fontSize: 12,
    color: '#363636'
  },
  filterNumber: {
    fontSize: 20,
    color: '#363636',
    fontWeight: 'bold',
  },
})

export default listFilter