import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type Toast = {
  message: string;
  type: ToastType;
};

type Props = Toast & {
  onHide: () => void;
};

const toastMessage = ({ message, type, onHide }: Props) => {
  let color = '';
  let backgroundColor = '';
  let iconName = '' as keyof typeof Ionicons.glyphMap;

  switch (type) {
    case 'success': color = '#38B359'; backgroundColor = '#b5ddc0'; iconName = 'checkmark-circle'; break;
    case 'error': color = '#FB3D3D'; backgroundColor = '#e7c3c3'; iconName = 'close-circle'; break;
    case 'warning': color = '#EF9400'; backgroundColor = '#f8e0c2'; iconName = 'warning'; break;
    case 'info': color = '#0067D9'; backgroundColor = '#c2d5f8'; iconName = 'information-circle'; break;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      onHide();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor, borderColor: color }]}>
      <Ionicons style={[styles.icon, { backgroundColor: color }]} name={iconName} size={20} color={'#FAFAFA'} />
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

export default toastMessage

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  icon: {
    padding: 5,
    borderRadius: 10,
  },
  text: {
    color: '#363636',
    marginLeft: 10,
  },
})