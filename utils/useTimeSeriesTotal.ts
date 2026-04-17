import { useCallback, useContext, useState } from 'react'
import { useFocusEffect } from 'expo-router'
import { AuthContext } from './authContext'
import { supabase } from './supabase'
import { ChartFilter, isDateInFilterRange } from './chartFilters'

type ChartPoint = {
  value: number
  quantity: number
  date: string
}

type UseTimeSeriesTotalsReturn = {
  priceData: ChartPoint[]
  quantityData: { value: number }[]
  isLoading: boolean
}

type AreaChartData = {
  price: number | null
  quantity: number | null
  checked: boolean
  lid: string
  lists: {
    scheduled: string
  } | null
}

const useTimeSeriesTotals = (filter: ChartFilter): UseTimeSeriesTotalsReturn => {
  const { user } = useContext(AuthContext)
  const [priceData, setPriceData] = useState<ChartPoint[]>([])
  const [quantityData, setQuantityData] = useState<{ value: number }[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useFocusEffect(
    useCallback(() => {
      const loadTotals = async () => {
        if (!user) return

        setIsLoading(true)

        try {
          const { data: lists } = await supabase
            .from('lists')
            .select('id')
            .eq('uid', user.id)

          const listIds = (lists ?? []).map(l => l.id)

          if (!listIds.length) {
            setPriceData([])
            setQuantityData([])
            return
          }

          const { data: items, error } = await supabase
            .from('items')
            .select('price, quantity, checked, lid, lists!lid(scheduled)')
            .in('lid', listIds)
            .eq('checked', true) as { data: AreaChartData[] | null; error: any }

          if (error) {
            console.log(error)
            return
          }

          const grouped: Record<string, { price: number; quantity: number }> = {}

          items?.forEach(item => {
            const scheduled = item.lists?.scheduled
            if (!scheduled) return

            const date = new Date(scheduled)
            if (Number.isNaN(date.getTime()) || !isDateInFilterRange(date, filter)) return

            const key = date.toISOString().split('T')[0]

            const price = Number(item.price ?? 0) * Number(item.quantity ?? 1)
            const quantity = Number(item.quantity ?? 1)

            if (!grouped[key]) {
              grouped[key] = { price, quantity }
            } else {
              grouped[key].price += price
              grouped[key].quantity += quantity
            }
          })

          const sortedDates = Object.keys(grouped).sort(
            (a, b) => new Date(a).getTime() - new Date(b).getTime()
          )

          setPriceData(
            sortedDates.map(date => ({
              value: grouped[date].price,
              quantity: grouped[date].quantity,
              date,
            }))
          )

          setQuantityData(
            sortedDates.map(date => ({
              value: grouped[date].quantity,
            }))
          )
        } catch (err) {
          console.log(err)
        } finally {
          setIsLoading(false)
        }
      }

      loadTotals()
    }, [user, filter])
  )

  console.log(priceData)

  return { priceData, quantityData, isLoading }
}

export default useTimeSeriesTotals