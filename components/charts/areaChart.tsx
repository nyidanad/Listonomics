import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { Dispatch, SetStateAction, useRef } from 'react'
import { LineChart } from 'react-native-gifted-charts';

import { Colors } from '../../constants/colors';
import useTimeSeriesTotals from '../../utils/useTimeSeriesTotal';
import { ChartFilter } from '../../utils/chartFilters';
import BarChart from './barChart';

type AreaChartProps = {
  setScrollEnabled: Dispatch<SetStateAction<boolean>>
  filter: ChartFilter
}

const AreaChart = ({ setScrollEnabled, filter }: AreaChartProps) => {
  const colorScheme = useColorScheme()
      
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  const lineChartRef = useRef<any>(null);
  const barChartRef = useRef<any>(null);

  const { priceData, quantityData } = useTimeSeriesTotals(filter)
  const maxPriceValue = priceData.length ? Math.max(...priceData.map(point => point.value)) : 10
  const maxQuantityValue = quantityData.length ? Math.max(...quantityData.map(point => point.value)) : 1

  return (
    <View style={[styles.container, { backgroundColor: theme.statBackground }]}>
      <Text style={styles.title}>
        Price and Quantity
      </Text>

      <View style={styles.chartContainer}>
        <LineChart
          areaChart
          data={priceData}
          allowFontScaling
          onScrollEndDrag={() => setScrollEnabled(true)}
          width={300}
          hideDataPoints
          spacing={10}
          color={theme === Colors.dark ? '#00ff83' : '#8cc9ac'}
          thickness={2}
          startFillColor={theme === Colors.dark ?'rgba(20,105,81,0.3)' : 'rgba(20,105,81,0.7)'}
          endFillColor={theme === Colors.dark ? 'rgba(20,85,81,0.01)' : 'rgba(65,203,136,0.05)'}
          startOpacity={theme === Colors.dark ? 0.5 : 0.25}
          endOpacity={0}
          initialSpacing={30}
          noOfSections={6}
          maxValue={maxPriceValue + maxPriceValue * 0.5}
          yAxisColor="white"
          yAxisThickness={0}
          rulesType="dashed"
          rulesColor={theme.areaRuler}
          yAxisTextStyle={{color: 'gray'}}
          xAxisColor={theme.areaAxisLabel}
          animateOnDataChange={false}
          scrollRef={lineChartRef}
          onScroll={(event: any) => {
            if (barChartRef.current) {
              barChartRef.current.scrollTo({ x: event.nativeEvent.contentOffset.x, animated: false });
            }
          }}
          pointerConfig={{
            onTouchStart: () => setScrollEnabled(false),
            onTouchEnd: () => setScrollEnabled(true),
            pointerStripHeight: 150,
            pointerStripColor: 'lightgray',
            pointerStripWidth: 2,
            pointerColor: 'lightgray',
            radius: 6,
            pointerLabelWidth: 100,
            pointerLabelHeight: 90,
            activatePointersOnLongPress: true,
            autoAdjustPointerLabelPosition: false,
            pointerLabelComponent: (items: any) => {
              const index = items[0].index

              return (
                <View style={[styles.pointerContainer, { backgroundColor: theme.areaPointerBackground }]}>
                  <Text style={[styles.pointerTitle, { color: theme.areaPointerText }]}>{items[0].date}</Text>
                  <View style={styles.pointerTextWrapper}>
                    <View style={[styles.pointerTextDot, { backgroundColor: theme === Colors.dark ? '#00ff83' : '#8cc9ac' }]} />
                    <Text style={[styles.pointerText, { color: theme.text }]}>Price: {'$' + items[0].value}</Text>
                  </View>
                  <View style={styles.pointerTextWrapper}>
                    <View style={[styles.pointerTextDot, { backgroundColor: '#bebff390' }]} />
                    <Text style={[styles.pointerText, { color: theme.text }]}>Quantity: {items[0].quantity}</Text>
                  </View>
                </View>
              );
            },
          }}
        />
        <BarChart ref={barChartRef} data={quantityData} maxValue={maxQuantityValue} />
      </View>
    </View>
  )
}

export default AreaChart

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
    fontFamily: 'InconsolataRegular',
  },
  chartContainer: {
    paddingTop: 30,
    paddingBottom: 50,
    paddingLeft: 20,
  },
  pointerContainer: {
    padding: 5,
    justifyContent: 'center',
    marginTop: -10,
    marginLeft: -20,
    borderRadius: 10,
  },
  pointerTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointerTitle: {
    marginBottom: 5, 
    fontFamily: 'InconsolataRegular',
  },
  pointerTextDot: {
    height: 5,
    width: 5,
    marginRight: 7,
    borderRadius: 999,
  },
  pointerText: {
    fontSize: 12, 
    fontFamily: 'InconsolataRegular',
  },
})