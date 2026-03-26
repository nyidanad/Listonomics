import Ionicons from '@expo/vector-icons/Ionicons'
import { Dispatch, SetStateAction } from 'react'
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'

import { Colors } from '../../constants/colors'

type listFilterProps = {
  title: string,
  icon: keyof typeof Ionicons.glyphMap,
  quantity: number,
  backgroundColor: string
  setFilter: Dispatch<SetStateAction<string>>
}

const listFilter = ({ title, icon, quantity, backgroundColor, setFilter }: listFilterProps) => {
  const colorScheme = useColorScheme()
      
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <TouchableOpacity style={[styles.filter, { backgroundColor: theme.filters }]} onPress={() => setFilter(title)}>
      <View style={styles.iconContainer}>
        <View style={[styles.icon, {backgroundColor}]}>
          <Ionicons style={styles.filterIcon} name={icon} />
        </View>
        <Text style={[styles.filterTitle, { color: theme.text }]}>{title}</Text>
      </View>
      <View>
        <Text style={[styles.filterNumber, { color: theme.text }]}>{quantity}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  filter: {
    width: '31%', 
    height: 55,
    borderRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  iconContainer: {
    justifyContent: 'space-between',
  },
  icon: {
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: 28,
    height: 28,
  },
  filterIcon: {
    fontSize: 18,
    color: '#FFF',
  },
  filterTitle: {
    fontSize: 10,
  },
  filterNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default listFilter