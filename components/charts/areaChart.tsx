import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { Dispatch, SetStateAction, useRef } from 'react'
import { LineChart } from 'react-native-gifted-charts';

import { Colors } from '../../constants/colors';
import BarChart from './barChart';

type AreaChartProps = {
  setScrollEnabled: Dispatch<SetStateAction<boolean>>
}

const AreaChart = ({ setScrollEnabled }: AreaChartProps) => {
  const colorScheme = useColorScheme()
      
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  const lineChartRef = useRef<any>(null);
  const barChartRef = useRef<any>(null);

  const ptData = [
    {value: 260, date: '1 Apr 2022'},
    {value: 280, date: '2 Apr 2022'},
    {value: 290, date: '3 Apr 2022'},
    {value: 280, date: '4 Apr 2022'},
    {value: 240, date: '5 Apr 2022'},
    {value: 245, date: '6 Apr 2022'},
    {value: 260, date: '7 Apr 2022'},
    {value: 300, date: '8 Apr 2022'},
    {value: 320, date: '9 Apr 2022'},
    {value: 340, date: '10 Apr 2022', label: '10 Apr', labelTextStyle: {color: 'lightgray', width: 60},},
    {value: 380, date: '11 Apr 2022'},
    {value: 360, date: '12 Apr 2022'},
    {value: 440, date: '13 Apr 2022'},
    {value: 485, date: '14 Apr 2022'},
    {value: 380, date: '15 Apr 2022'},
    {value: 490, date: '16 Apr 2022'},
    {value: 470, date: '17 Apr 2022'},
    {value: 385, date: '18 Apr 2022'},
    {value: 395, date: '19 Apr 2022'},
    {value: 400, date: '20 Apr 2022', label: '20 Apr', labelTextStyle: {color: 'lightgray', width: 60},},
    {value: 380, date: '21 Apr 2022'},
    {value: 395, date: '22 Apr 2022'},
    {value: 360, date: '23 Apr 2022'},
    {value: 355, date: '24 Apr 2022'},
    {value: 290, date: '25 Apr 2022'},
    {value: 320, date: '26 Apr 2022'},
    {value: 305, date: '27 Apr 2022'},
    {value: 330, date: '28 Apr 2022'},
    {value: 310, date: '29 Apr 2022'},
    {value: 300, date: '30 Apr 2022', label: '30 Apr', labelTextStyle: {color: 'lightgray', width: 60},},
    {value: 340, date: '1 May 2022'},
    {value: 350, date: '2 May 2022'},
    {value: 380, date: '3 May 2022'},
    {value: 350, date: '4 May 2022'},
    {value: 310, date: '5 May 2022'},
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.statBackground }]}>
      <Text style={styles.title}>
        Price and Quantity
      </Text>

      <View style={styles.chartContainer}>
        <LineChart
          areaChart
          data={ptData}
          rotateLabel
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
          initialSpacing={20}
          noOfSections={6}
          maxValue={600}
          yAxisColor="white"
          yAxisThickness={0}
          rulesType="dashed"
          rulesColor={theme.areaRuler}
          yAxisTextStyle={{color: 'gray'}}
          xAxisColor={theme.areaAxisLabel}
          animateOnDataChange
          animationDuration={1000}
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
              return (
                <View style={[styles.pointerContainer, { backgroundColor: theme.areaPointerBackground }]}>
                  <Text style={[styles.pointerTitle, { color: theme.areaPointerText }]}>{items[0].date}</Text>
                  <View style={styles.pointerTextWrapper}>
                    <View style={[styles.pointerTextDot, { backgroundColor: theme === Colors.dark ? '#00ff83' : '#8cc9ac' }]} />
                    <Text style={[styles.pointerText, { color: theme.text }]}>Price: {'$' + items[0].value}</Text>
                  </View>
                  <View style={styles.pointerTextWrapper}>
                    <View style={[styles.pointerTextDot, { backgroundColor: '#bebff390' }]} />
                    <Text style={[styles.pointerText, { color: theme.text }]}>Quantity: {items[0].value}</Text>
                  </View>
                </View>
              );
            },
          }}
        />
        <BarChart ref={barChartRef} />
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
    marginLeft: -40,
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