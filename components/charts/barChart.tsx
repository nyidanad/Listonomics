import { StyleSheet, useColorScheme, View } from 'react-native'
import React, { forwardRef } from 'react'
import { BarChart } from "react-native-gifted-charts";

import { Colors } from '../../constants/colors';

const barChart = forwardRef<any>((props, ref) => {
  const colorScheme = useColorScheme()
        
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  const data = [
  { value: 842 },
  { value: 117 },
  { value: 963 },
  { value: 58 },
  { value: 721 },
  { value: 406 },
  { value: 999 },
  { value: 234 },
  { value: 615 },
  { value: 82 },
  { value: 540 },
  { value: 378 },
  { value: 910 },
  { value: 144 },
  { value: 667 },
  { value: 29 },
  { value: 801 },
  { value: 492 },
  { value: 356 },
  { value: 978 },
  { value: 210 },
  { value: 734 },
  { value: 65 },
  { value: 888 },
  { value: 423 },
  { value: 559 },
  { value: 12 },
  { value: 692 },
  { value: 305 },
  { value: 947 },
  { value: 178 },
  { value: 520 },
  { value: 761 },
  { value: 96 },
  { value: 834 },
];

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
        initialSpacing={15}
        hideYAxisText
        hideAxesAndRules
        maxValue={800}
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