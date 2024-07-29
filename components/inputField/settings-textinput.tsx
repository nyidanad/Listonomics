import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { StyleSheet, Switch, Text, View } from 'react-native'

type SettingsTextInputProps = {
  title: string
  iconDir: 'Ionicons' | 'FontAwesome5'
  leftIcon: keyof typeof Ionicons.glyphMap | keyof typeof FontAwesome5.glyphMap
  color: string
  showLabel?: boolean
  label?: string
  toggled?: boolean
  rightIcon?: keyof typeof Ionicons.glyphMap
  onClick?: () => void
}

const SettingsTextInput = ({ title, iconDir, leftIcon, color, showLabel, label, toggled, rightIcon, onClick }: SettingsTextInputProps) => {
  const LeftIconComponent = iconDir === 'Ionicons' ? Ionicons : FontAwesome5;
  const titleStyle = title === 'Wipe datas' ? [styles.title, {color: 'red'}] : styles.title

  return (
    <View style={styles.container}>
      <View style={styles.leftIconWrapper}>
        <LeftIconComponent name={leftIcon} color={'#FFF'} size={18} style={[styles.leftIcon, { backgroundColor: color }]} />
        <Text style={titleStyle}>{title}</Text>
      </View>

      <View style={styles.rightIconWrapper}>
        {showLabel && (
          <Text style={styles.label}>{label}</Text>
        )}
        {rightIcon === undefined ?
          <Switch
            style={styles.switch}
            trackColor={{ false: '#AEB6C3', true: '#016AFF' }}
            thumbColor='#FFF'
            onValueChange={onClick}
            value={toggled}
          />
        :
          <Ionicons name={rightIcon} color={'#AEB6C3'} size={20} />
        }
      </View>
    </View>
)
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
  title: {
    color: '#363636',
    fontSize: 16,
    marginLeft: 20,
  },
  label: {
    color: '#AEB6C3',
    fontSize: 12,
    marginRight: 10,
  },
  switch: {
    position: 'absolute',
    right: 0,
  },
})

export default SettingsTextInput