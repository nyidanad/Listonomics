import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import { Dispatch, SetStateAction } from 'react'

type SettingProps = {
  title: string
  tooltip: string
  iconDir: 'Ionicons' | 'FontAwesome5'
  leftIcon: keyof typeof Ionicons.glyphMap | keyof typeof FontAwesome5.glyphMap
  color: string
  showLabel?: boolean
  label?: string
  rightIcon: keyof typeof Ionicons.glyphMap
  setShowModal: Dispatch<SetStateAction<boolean>>
}

const setting = ({ title, tooltip, iconDir, leftIcon, color, showLabel, label, rightIcon, setShowModal }: SettingProps) => {
  const LeftIconComponent = iconDir === 'Ionicons' ? Ionicons : FontAwesome5;
  const titleStyle = title === 'Wipe datas' ? [styles.title, {color: 'red'}] : styles.title

  return (
    <TouchableOpacity style={styles.container} onPress={() => setShowModal(true)}>
      <View style={styles.leftIconWrapper}>
        <LeftIconComponent name={leftIcon} color={'#FFF'} size={18} style={[styles.leftIcon, { backgroundColor: color }]} />
        <View style={styles.titleWrapper}>
          <Text style={titleStyle}>{title}</Text>
          <Text style={styles.tooltip}>{tooltip}</Text>
        </View>
      </View>

      <View style={styles.rightIconWrapper}>
        {showLabel && <Text style={styles.label}>{label}</Text> }
        <Ionicons name={rightIcon} color={'#AEB6C3'} size={20} />
      </View>
    </TouchableOpacity>
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
  label: {
    color: '#AEB6C3',
    fontSize: 12,
    marginRight: 10,
  },
})

export default setting