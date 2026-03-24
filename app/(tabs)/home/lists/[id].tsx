import { SectionList, StyleSheet, Text, View } from "react-native"
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Image } from "expo-image"
import { SafeAreaView } from "react-native-safe-area-context"

import { BottomSheetModal } from "@gorhom/bottom-sheet"
import Ionicons from '@expo/vector-icons/Ionicons'

import CustomListHeader from "../../../../components/header/customListHeader"
import ListDetails from "../../../../components/list/listDetails"
import CategoryButton from "../../../../components/buttons/categoryButton"
import ItemButton from "../../../../components/buttons/itemButton"
import ItemCategoryModal, { IconMap } from "../../../../components/modals/itemCategoryModal"
import Item from "../../../../components/item/item"

import { supabase } from "../../../../utils/supabase"
import fetchItems from "../../../../utils/fetchItems"
import fetchStats from "../../../../utils/fetchItemStats"

type ListProps = {
  id: string,
  title: string,
  color: string,
}

const ListPage = () => {
  const { id, title, color } = useLocalSearchParams() as ListProps
  const [selectedCategories, setSelectedCategories] = useState<any[]>([])
  const [collapsedSections, setCollapsedSections] = useState(new Set())
  const [readonly, setReadonly] = useState<boolean>(false)
  const [inCartCount, setInCartCount] = useState<number>(0)
  const [totalCost, setTotalCost] = useState<number>(0)

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const onToggle = async (item: any) => {
    try {
      const { error } = await supabase
        .from('items')
        .update({ checked: !item.checked })
        .eq('id', item.id)

      if (error) {
        throw Error('Toggle failed ', error)
      }

      setSelectedCategories(prev =>
        prev.map(section => ({
          ...section,
          data: section.data.map((i: any) =>
            i.id === item.id ? { ...i, checked: !i.checked } : i
          )
        }))
      )
    } catch (err) {
      console.log('Toggle failed:', err)
    }
  }

  useEffect(() => {
    fetchStats({ id, setInCartCount, setTotalCost })
  }, [onToggle])

  useEffect(() => {
    fetchItems({ id, setSelectedCategories })
  }, [])

  // >> real-time channel ::
  // listen to changes in 'items' table for the current list and refresh data
  useEffect(() => {
    const channel = supabase
      .channel('items-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'items',
          filter: `lid=eq.${id}`,
        },
        () => {
          fetchItems({ id, setSelectedCategories })
          fetchStats({ id, setInCartCount, setTotalCost })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [id])

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
    <SafeAreaView style={{ flex: 1 }}>
      <CustomListHeader readonly={readonly} setReadonly={setReadonly} />
      <View style={styles.container}>
        {!readonly &&
        <View style={styles.details}>
          <ListDetails title="In cart" icon="shopping-basket" color="#404040" information={`${inCartCount}/${selectedCategories.reduce((s, section) => s + (section.data?.length ?? 0), 0)}`} />
          <ListDetails title="Costs" icon="dollar-sign" color="#2ECC71" information={`${totalCost} Ft`} />
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
                <Item name={item.name} checked={item.checked} color={section.color} priority={item.priority} onToggle={() => onToggle(item)} />
              </View>
            )
          }}

          renderSectionFooter={({section}) => {
            const isCollapsed = collapsedSections.has(section.title)

            if (isCollapsed) return null 

            return (
              readonly ? <View style={{ marginBottom: 15 }} /> : <ItemButton lid={id} category={section.title} />
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
    </SafeAreaView>
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