import { StyleSheet, View } from "react-native"


const hr = () => {
  return (
    <View style={styles.hr} />
  )
}

const styles = StyleSheet.create({
  hr: {
    borderBottomColor: '#EDEEF2',
    borderBottomWidth: 0.75,
    marginTop: 8,
    marginBottom: 5,
  },
})

export default hr