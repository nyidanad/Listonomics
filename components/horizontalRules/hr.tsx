import { DimensionValue, View } from "react-native"

type HrProps = {
  color: string,
  width: number,
  length?: DimensionValue,
  top?: number,
  bottom?: number,
  align?: 'flex-end' | 'flex-start' | 'center'
}

const Hr = ({ color, width, length, top, bottom, align }: HrProps) => {
  return (
    <View 
      style={{ 
        width: '100%',
        borderBottomColor: color,
        borderBottomWidth: width,
        maxWidth: length,
        marginTop: top,
        marginBottom: bottom,
        alignSelf: align
      }}
    />
  )
}

export default Hr