import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native"

const List = () => {
  const { id } = useLocalSearchParams();

  return (
    <View style={{justifyContent: 'center', margin: 'auto'}}>
      <Text>List no. {id}</Text>
    </View>
  )
}

export default List