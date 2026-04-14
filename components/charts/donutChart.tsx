import { ActivityIndicator, FlatList, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { PieChart } from 'react-native-gifted-charts'

import useCategoryTotals from '../../utils/useCategoryTotals'
import { Colors } from '../../constants/colors'

const circleRadius = 150
const innerRadius = circleRadius * 0.85

const DonutChart = () => {
  const colorScheme = useColorScheme()
  const { pieData, totalSpent, isLoading } = useCategoryTotals()

  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  const renderLegend = (text: string, value: number, color: string) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
        <View
          style={{
            height: 8,
            width: 8,
            marginRight: 5,
            borderRadius: 999,
            backgroundColor: color || 'white',
          }}
        />
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Text style={{ color: theme.text, fontSize: 12, marginRight: 5, fontFamily: 'InconsolataRegular' }}>{text}</Text>
          <Text style={{ color: theme.donutLabelValue, fontSize: 12, fontFamily: 'InconsolataRegular' }}>{value.toLocaleString()} Ft</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.statBackground }]}>
      <Text style={{ color: '#007AFF', fontSize: 16, alignSelf: 'flex-start', marginLeft: 20, marginTop: 10, fontFamily: 'InconsolataRegular' }}>
        Money spent on categories
      </Text>
      <PieChart
        donut
        radius={circleRadius}
        innerRadius={innerRadius}
        backgroundColor={theme.statBackground}
        data={pieData}
        centerLabelComponent={() => {
          return (
            isLoading ?
            <ActivityIndicator color="#C9C9C9B2" size="large" />
            :
            <View style={{ alignItems: 'center' }}>
              <Text style={[styles.detailTitle, { color: theme.donutTitle }]}>Total spent</Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>{totalSpent.toLocaleString()} Ft</Text>
            </View>
          )
        }}
        paddingVertical={10}
        initialAngle={45}
        strokeWidth={10}
        strokeColor={theme.statBackground}
      />

      <FlatList
        style={{ width: '100%', flexDirection: 'row', paddingVertical: 6, marginBottom: 14, maxWidth: 300 }}
        data={pieData}
        renderItem={({ item }) => renderLegend(item.text, item.value, item.color)}
        keyExtractor={(item) => item.text}
        horizontal
      />
    </View>
  )
}

export default DonutChart

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  detailTitle: {
    fontSize: 16,
    fontFamily: 'InconsolataRegular',
  },
  detailValue: {
    fontSize: 38,
    fontFamily: 'InconsolataRegular',
  },
  detailChange: {
    fontSize: 14,
    fontFamily: 'InconsolataRegular',
  },
})