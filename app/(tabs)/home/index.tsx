import { Link } from 'expo-router'
import { Text } from 'react-native'

export const Home = () => {
  return (
    <>
      <Text>Home page</Text>
      <Link href='home/lists/1'>List 1</Link>
      <Link href='home/lists/2'>List 2</Link>
    </>
  )
}

export default Home