import { StyleSheet, Text, View } from "react-native"
import { useCallback, useRef, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'

import { BottomSheetModal } from "@gorhom/bottom-sheet"

import CustomListHeader from "../../../../components/header/customListHeader"
import ListDetails from "../../../../components/list/listDetails"
import CategoryButton from "../../../../components/buttons/categoryButton"
import ItemCategoryModal from "../../../../components/modals/itemCategoryModal"

type ListProps = {
  title: string,
  color: string,
}

const ListPage = () => {
  const { title, color } = useLocalSearchParams() as ListProps

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <CustomListHeader />
        <View style={styles.container}>
          <View style={styles.details}>
            <ListDetails title="In cart" icon="shopping-basket" color="#404040" information="3/8" />
            <ListDetails title="Costs" icon="dollar-sign" color="#2ECC71" information="1940 Ft" />
          </View>
          
          <Text style={[styles.title, { color: color }]}>{title}</Text>

          <CategoryButton onPress={handlePresentModalPress} />
          <ItemCategoryModal ref={bottomSheetModalRef} />

        </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAFAFA',
  }, 
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  }
})

export default ListPage