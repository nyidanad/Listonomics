import Checkbox from "expo-checkbox"
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import Hr from "../horizontalRules/hr-item";

type ItemProps = {
  name: string,
  price: number,
  quantity: number,
  checked: boolean,
  color: string,
}

const CIRCLE_SIZE = 24
const CIRCLE_RING_SIZE = 1.5

const Item = ({ name, price, quantity, checked, color }: ItemProps) => {
  const [isChecked, setChecked] = useState(checked);

  return (
    <View>
      <TouchableOpacity style={styles.container}>
        <View style={styles.itemLeft}>
          <View style={[styles.circle, isChecked && { borderColor: color }]}>
            <Checkbox
              style={isChecked ? styles.selectedCheckbox : styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? color : '#BDBDBD'}
            />
          </View>
          <Text style={[styles.itemText, isChecked ? {color: '#E7E7E7'} : {color: '#363636'}]}>{name}</Text>
        </View>
        <View style={styles.itemRight}>
          {price != 0 && <Text style={styles.cost}>{price} Ft</Text>}
          {price != 0 && <Text style={styles.quantity}>x{quantity}</Text>}
        </View>
      </TouchableOpacity>
      <Hr />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkbox: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: 999,
    borderWidth: CIRCLE_RING_SIZE,
  },
  selectedCheckbox: {
    width: CIRCLE_SIZE - CIRCLE_RING_SIZE * 4,
    height: CIRCLE_SIZE - CIRCLE_RING_SIZE * 4,
    borderRadius: 999,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: 999,
    borderWidth: CIRCLE_RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemLeft: {
    maxWidth: '65%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 17,
  },
  itemRight: {
    maxWidth: '35%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cost: {
    flex: 1,
    textAlign: 'right',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#363636',
  },
  quantity: {
    marginLeft: 15,
    color: '#ED2939'
  },
})

export default Item