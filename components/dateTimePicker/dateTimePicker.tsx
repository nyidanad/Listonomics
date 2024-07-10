import Ionicons from '@expo/vector-icons/Ionicons'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type DTProps = {
  value: Date,
  show: boolean,
  label: boolean,
  labelText?: string
  onPress: () => void
  onChange: (event: DateTimePickerEvent, selectedDate?: Date) => void,
}

const CustomDateTimePicker = ({ value, show, label, labelText, onPress, onChange }: DTProps) => {
  const renderLabel = () => {
    return (
      <Text style={styles.label}>
        {labelText}
      </Text>
    )
  }

  return (
    <View>
      {label && renderLabel()}
      <TouchableOpacity onPress={onPress}>
        <View style={styles.input}>
          <Text style={styles.dateText}>
            {value.toLocaleDateString('HU', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//, '.')}
          </Text>
          <Ionicons name="calendar-sharp" style={styles.dateIcon} />
        </View>
      </TouchableOpacity>
      {show && (<DateTimePicker value={value} is24Hour={true} mode={"date"} onChange={onChange} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 50,
    borderColor: '#ADADAD',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  dateText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
  dateIcon: {
    fontSize: 26,
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

export default CustomDateTimePicker