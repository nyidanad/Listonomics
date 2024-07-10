import { StyleSheet, View } from "react-native"


const hr = () => {
  return (
    <View style={styles.hr} />
  )
}

const styles = StyleSheet.create({
  hr: {
    borderBottomColor: '#E5E5E5',
    borderStyle: 'dashed',
    borderBottomWidth: 1.25,
    marginVertical: 7,
  },
})

export default hr