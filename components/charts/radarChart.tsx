import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { RadarChart } from "react-native-gifted-charts";

import { Colors } from '../../constants/colors';
import useExpensesByDay from '../../utils/useExpensesByDay';

const radarChart = () => {
  const colorScheme = useColorScheme()
        
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  const { expensesByDay } = useExpensesByDay()
  const visualData = expensesByDay.map(value => (value === 0 ? 0.3 : value))
  const maxValue = Math.max(...visualData, 5)

  return (
    <View style={[styles.container, { backgroundColor: theme.statBackground }]}>
      <Text style={styles.title}>
        Distribution of expenses by day
      </Text>

      <RadarChart
        data={expensesByDay}
        labels={['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap']}
        labelConfig={{
          stroke: theme.radarText,
          fontFamily: 'InconsolataRegular',
        }}
        maxValue={maxValue}
        startAngle={90}
        
        chartContainerProps={{
          width: 300,
        }}

        polygonConfig={{
          stroke: '#007AFF',
          fill: '#007bffbd'
        }}

        gridConfig={{
          stroke: theme.radarStroke,
          fill: '#7676801f',
          showGradient: false
        }}

        asterLinesConfig={{
          stroke: theme.radarStroke,
          strokeWidth: 1
        }}

        isClockWise
        isAnimated
        animationDuration={2000}
      />
    </View>
  )
}

export default radarChart

const styles = StyleSheet.create({
  container: {
    marginTop: 20, 
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    color: '#007AFF', 
    fontSize: 16, 
    marginLeft: 20, 
    marginTop: 10, 
    marginBottom: 10,
    fontFamily: 'InconsolataRegular',
  },
})