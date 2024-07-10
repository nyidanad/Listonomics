import { useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"

type BSTextInputProps = {
  value: string | undefined,
  placeholder: string,
  keyboardtype: "default" | "numeric",
  onChangeText: (text: string) => void,
}


const BSTextInput = ({ value, placeholder, keyboardtype, onChangeText }: BSTextInputProps) => {
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
      {renderLabel()}
      <TextInput
        style={[styles.input, isFocus && { borderColor: 'blue' }]}
        keyboardType={keyboardtype}
        placeholder={ isFocus ? undefined : placeholder}
        placeholderTextColor={'#ADADAD'}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
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
})

export default BSTextInput