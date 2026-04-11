import { FlatList, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'

import { PieChart } from "react-native-gifted-charts";
import { Colors } from '../../constants/colors';

const circleRadius = 150
const innerRadius = circleRadius * 0.85

const DonutChart = () => {
  const colorScheme = useColorScheme()
    
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  const pieData = [
    {text: 'Base Foods', value:  5, color: '#FFC0D8'},
    {text: 'Snacks', value: 10, color: '#EE9EFF'},
    {text: 'Non-alcoholic Drinks', value: 25, color: '#B7B5FC'},
    {text: 'Meat & Seafood', value: 60, color: '#C2F5FB'},
  ];

  const renderLegend = (text: string, value: number, color: string) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
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
          <Text style={{color: theme.text, fontSize: 12, marginRight: 5, fontFamily: 'InconsolataRegular' }}>{text || ''}</Text>
          <Text style={{color: theme.donutLabelValue, fontSize: 12, fontFamily: 'InconsolataRegular' }}>{value + '%' || ''}</Text>
        </View>
      </View>
    );
  };

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
            <View style={{ alignItems: 'center' }}>
              <Text style={[styles.detailTitle, { color: theme.donutTitle }]}>Total balance</Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>22.540 Ft</Text>
              <Text style={[styles.detailChange, { color: theme.donutLabelChange }]}>+17.2%</Text>
            </View>
          );
        }}
        paddingVertical={10}
        initialAngle={45}
        strokeWidth={10}
        strokeColor={theme.statBackground}
        />
      
      {/* Legend */}
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