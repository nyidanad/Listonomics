import { ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import CustomStatHeader from '../../../components/header/customStatHeader'
import DonutChart from '../../../components/charts/donutChart'
import AreaChart from '../../../components/charts/areaChart'
import RadarChart from '../../../components/charts/radarChart'
import { Colors } from '../../../constants/colors'
import { useState } from 'react'
import { ChartFilter } from '../../../utils/chartFilters'

const Graphs = () => {
  const colorScheme = useColorScheme()
  
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  const filters: ChartFilter[] = ['7D', '1M', '3M', '1Y', 'All']
  
  const [activeFilter, setActiveFilter] = useState<ChartFilter>('1M')
  const [scrollEnabled, setScrollEnabled] = useState(true)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <CustomStatHeader />
      
      {/* filters */}
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={[styles.filters, { backgroundColor: theme.statBackground }]}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={[styles.filterButton, 
                      activeFilter === filter && {  backgroundColor: theme.statFilterActiveBackground, borderColor: theme.statFilterActiveBorder, borderWidth: 1 }
                    ]}
            >
              <Text
                style={[styles.filterButtonText, { color: theme.statFilterText }, activeFilter === filter && { color: theme.text } ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* charts */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          scrollEnabled={scrollEnabled}
        >
          <View style={{ paddingHorizontal: 2 }}>
            <DonutChart filter={activeFilter} />
            <AreaChart filter={activeFilter} setScrollEnabled={setScrollEnabled} />
            <RadarChart filter={activeFilter} />
          </View>
        </ScrollView>
      </View>

    </SafeAreaView>
  )
}

export default Graphs

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
    marginTop: 25,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonText: {
    fontFamily: 'InconsolataRegular',
  },
})