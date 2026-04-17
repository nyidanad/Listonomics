import { StyleSheet, useColorScheme, View } from 'react-native'
import React, { forwardRef } from 'react'
import { BarChart } from "react-native-gifted-charts";

import { Colors } from '../../constants/colors';

type BarChartProps = {
  data: { value: number }[]
  maxValue: number
}

const barChart = forwardRef<any, BarChartProps>(({ data, maxValue }, ref) => {
  const colorScheme = useColorScheme()
        
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <View style={styles.container}>
      <BarChart 
        data={data} 
        frontColor={theme === Colors.dark ? '#bebff346' : '#bebff390'} 
        width={300} 
        height={50}
        rulesColor={'transparent'}
        yAxisThickness={0}
        xAxisThickness={0}
        barWidth={10}
        spacing={0}
        initialSpacing={25}
        hideYAxisText
        hideAxesAndRules
        maxValue={maxValue + maxValue * 0.5}
        scrollRef={ref}
        endSpacing={30}
        isAnimated
        animationDuration={2000}
      />
    </View>
  )
});

export default barChart

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 45,
    zIndex: -1,
  },
})