import { Redirect } from 'expo-router'
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"

const Root = () => {
  return (
    <BottomSheetModalProvider>
      <Redirect href="home" />
    </BottomSheetModalProvider>
  )
}

export default Root