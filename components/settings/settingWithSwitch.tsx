import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { StyleSheet, Switch, Text, View } from 'react-native'

type SettingProps = {
  title: string
  tooltip: string
  iconDir: 'Ionicons' | 'FontAwesome5'
  leftIcon: keyof typeof Ionicons.glyphMap | keyof typeof FontAwesome5.glyphMap
  color: string
  toggled: boolean
  onClick?: () => void
}

const settingWithSwitch = ({ title, tooltip, iconDir, leftIcon, color, toggled, onClick }: SettingProps) => {
  const LeftIconComponent = iconDir === 'Ionicons' ? Ionicons : FontAwesome5;

  return (
    <View style={styles.container}>
      <View style={styles.leftIconWrapper}>
        <LeftIconComponent name={leftIcon} color={'#FFF'} size={18} style={[styles.leftIcon, { backgroundColor: color }]} />
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.tooltip}>{tooltip}</Text>
        </View>
      </View>

      <View style={styles.rightIconWrapper}>
        <Switch
          style={styles.switch}
          trackColor={{ false: '#AEB6C3', true: '#016AFF' }}
          thumbColor='#FFF'
          onValueChange={onClick}
          value={toggled}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 8,
  },
  leftIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    padding: 6,
    borderRadius: 8,    
  },
  rightIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleWrapper: {
    marginLeft: 20,
  },
  title: {
    color: '#363636',
    fontSize: 16,
  },
  tooltip: {
    color: '#B1B1B1',
    fontSize: 10,

  },
  switch: {
    position: 'absolute',
    right: 0,
  },
})

export default settingWithSwitch