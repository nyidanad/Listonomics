import Ionicons from '@expo/vector-icons/Ionicons'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

type dataProps = {
  label: string,
  value: string,
}

type DropdownProps = {
  data: dataProps[],
  value: dataProps,
  label: boolean,
  placeholder: string,
  icon: keyof typeof Ionicons.glyphMap,
  onChange: (x: dataProps) => void
}

const CustomDropdown = ({ data, value, label, placeholder, icon, onChange }: DropdownProps) => {
  const [isFocus, setIsFocus] = useState(false)

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          {placeholder}
        </Text>
      )
    }
    return null
  }

  return (
    <View>
      {label && renderLabel()}
      <Dropdown
        style={[styles.input, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={onChange}
        renderRightIcon={() => (
          <Ionicons style={styles.priorityIcon} name={icon} color={isFocus ? 'blue' : '#4A4A4A'}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: '#ADADAD',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#4A4A4A',
  },
  label: {
    position: 'absolute',
    paddingHorizontal: 6,
    left: 12,
    top: -8,
    zIndex: 999,
    backgroundColor: '#FFF',
    color: '#ADADAD',
    fontSize: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#4A4A4A'
  },
  priorityIcon: {
    fontSize: 20,
    marginRight: 5,
  },
})

export default CustomDropdown