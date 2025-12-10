import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, forwardRef, Dispatch, SetStateAction } from 'react'
import { Image } from 'expo-image'

import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'

import assets from '../../data/assets.json'
import ItemCategoryBackdrop from './itemCategoryBackdrop'

export const IconMap: Record<string, any> = {
  bread: require('../../assets/icons/bread.svg'),
  meat: require('../../assets/icons/meat.svg'),
  snow: require('../../assets/icons/snow.svg'),
  apple: require('../../assets/icons/apple.svg'),
  milk: require('../../assets/icons/milk-bottle.svg'),
  coffee: require('../../assets/icons/coffee-cup.svg'),
  water: require('../../assets/icons/water-bottle.svg'),
  beer: require('../../assets/icons/beer-bottle.svg'),
  candy: require('../../assets/icons/candy.svg'),
  cheeseburger: require('../../assets/icons/cheeseburger.svg'),
  house: require('../../assets/icons/house.svg'),
  detergent: require('../../assets/icons/detergent-bottle.svg'),
  cream: require('../../assets/icons/cream.svg'),
  pills: require('../../assets/icons/pills.svg'),
  shirt: require('../../assets/icons/shirt.svg'),
  lightning: require('../../assets/icons/lightning-bolt.svg'),
  tools: require('../../assets/icons/tools.svg'),
  hammer: require('../../assets/icons/hammer.svg'),
  muscle: require('../../assets/icons/muscle.svg'),
  book: require('../../assets/icons/book.svg'),
  teddy: require('../../assets/icons/teddy-bear.svg'),
  baby: require('../../assets/icons/baby-bottle.svg'),
  paw: require('../../assets/icons/paw.svg'),
};

type ItemCategoryModalProps = {
  selectedCategories: any[]
  setSelectedCategories: Dispatch<SetStateAction<any[]>>
}

const ItemCategoryModal = forwardRef<BottomSheetModal, ItemCategoryModalProps>(({ selectedCategories, setSelectedCategories }, ref) => {
  const snapPoints = useMemo(() => ['45%', '45%', '67%'], []);
  const categories = assets.categories.filter(
    category => !selectedCategories.some(selected => selected.title === category.title)
  );
  
  return (
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose
      enableDismissOnClose
      snapPoints={snapPoints}
      backdropComponent={ItemCategoryBackdrop}
    >
      <BottomSheetView style={styles.container}>
        <Text style={styles.title}>Categories</Text>

        <ScrollView contentContainerStyle={styles.categories}>
          {categories.map((category, index) => {
            return (
              <TouchableOpacity key={index} style={styles.category} onPress={() => setSelectedCategories(prev => [...prev, category])}>
                <View style={[styles.image, { backgroundColor: category.color }]} >
                  <Image source={IconMap[category.icon]} style={styles.icon} />
                </View>
                <Text style={[styles.text, { color: category.color }]} >{category.title}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </BottomSheetView>
    </BottomSheetModal>
  )
})

export default ItemCategoryModal;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  categories: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  category: {
    maxWidth: 74,
    minHeight: 95,
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    color: '#363636',
    fontWeight: 'bold',
  },
  image: {
    width: 58,
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 3,
  },
  icon: {
    width: 36,
    height: 36,
  },
  text: {
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})