import { StyleSheet, Text } from 'react-native'
import React, { useMemo, forwardRef } from 'react'

import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'

import ItemCategoryBackdrop from './itemCategoryBackdrop'

const ItemCategoryModal = forwardRef<BottomSheetModal>((props, ref) => {
  const snapPoints = useMemo(() => ['45%', '45%', '65%'], []);

  return (
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose
      snapPoints={snapPoints}
      backdropComponent={ItemCategoryBackdrop}
    >
      <BottomSheetView style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.title}>Categories</Text>
      </BottomSheetView>
    </BottomSheetModal>
  )
})

export default ItemCategoryModal;

const styles = StyleSheet.create({
  title: {
    color: '#363636',
    fontWeight: 'bold',
  },
})