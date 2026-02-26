import { SectionList, StyleSheet, Text, View } from "react-native"
import { useCallback, useRef, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Image } from "expo-image"

import { BottomSheetModal } from "@gorhom/bottom-sheet"
import Ionicons from '@expo/vector-icons/Ionicons'

import CustomListHeader from "../../../../components/header/customListHeader"
import ListDetails from "../../../../components/list/listDetails"
import CategoryButton from "../../../../components/buttons/categoryButton"
import ItemButton from "../../../../components/buttons/itemButton"
import ItemCategoryModal, { IconMap } from "../../../../components/modals/itemCategoryModal"
import Item from "../../../../components/item/item"

import assets from "../../../../data/assets.json"

type ListProps = {
  title: string,
  color: string,
}

const ListPage = () => {
  const { title, color } = useLocalSearchParams() as ListProps
  const [selectedCategories, setSelectedCategories] = useState<any[]>([])
  const [collapsedSections, setCollapsedSections] = useState(new Set())
  const [readonly, setReadonly] = useState<boolean>(false)

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const handleToggle = (title: string) => {
    setCollapsedSections((collapsedSections) => {
      const next = new Set(collapsedSections);
      if (next.has(title)) {
        next.delete(title)
      } else {
        next.add(title)
      }
      return next
    })
  }

  return (
    <>
      <CustomListHeader readonly={readonly} setReadonly={setReadonly} />
      <View style={styles.container}>
        {!readonly &&
        <View style={styles.details}>
          <ListDetails title="In cart" icon="shopping-basket" color="#404040" information="3/8" />
          <ListDetails title="Costs" icon="dollar-sign" color="#2ECC71" information="1940 Ft" />
        </View>}
        
        {!readonly && <Text style={[styles.title, { color: color }]}>{title}</Text>}

        <SectionList
          sections={selectedCategories}
          extraData={collapsedSections}
          keyExtractor={(item, index) => item + index}
          style={{ flexGrow: 0 }}

          renderSectionHeader={({ section }) => {
            const isCollapsed = collapsedSections.has(section.title)

            return (
              <>
                <View style={styles.header}>
                  <View style={styles.headerWrapper}>
                    <Image
                      source={IconMap[section.icon]}
                      tintColor={section.color}
                      style={styles.icon}
                    />
                    <Text style={[styles.categoryTitle, { color: section.color }]}>
                      {section.title}
                    </Text>
                  </View>
                  <Ionicons name={isCollapsed ? "chevron-down" : "chevron-up"} size={24} color="#999999" onPress={() => handleToggle(section.title)} />
                </View>
              </>
            )
          }}

          renderItem={({ item, section }) => {
            const isCollapsed = collapsedSections.has(section.title)

            if (isCollapsed) return null

            return (
              <View style={{ borderLeftWidth: 4, borderLeftColor: section.color }}>
                <Item name={item.name} checked={false} color={section.color} priority={item.priority} />
              </View>
            )
          }}

          renderSectionFooter={({section}) => {
            const isCollapsed = collapsedSections.has(section.title)

            if (isCollapsed) return null 

            return (
              readonly ? <View style={{ marginBottom: 15 }} /> : <ItemButton />
            )
          }}
        />

        {!readonly && <CategoryButton onPress={handlePresentModalPress} />}
        <ItemCategoryModal
          ref={bottomSheetModalRef}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

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
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
    borderStyle: 'dashed',
    paddingVertical: 5,
    marginBottom: 5,
    paddingLeft: 8,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 20,
    marginLeft: 10,
  },
  icon: {
    width: 36,
    height: 36,
  },
})

export default ListPage