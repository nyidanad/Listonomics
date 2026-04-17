import { useCallback, useContext, useState } from 'react'
import { useFocusEffect } from 'expo-router'
import { AuthContext } from './authContext'
import { supabase } from './supabase'
import { PostgrestError } from '@supabase/supabase-js'
import { ChartFilter, isDateInFilterRange } from './chartFilters'

type CategoryTotal = {
  text: string
  value: number
  color: string
}

type UseCategoryTotalsReturn = {
  pieData: CategoryTotal[]
  totalSpent: number
  isLoading: boolean
}

const useCategoryTotals = (filter: ChartFilter): UseCategoryTotalsReturn => {
  const { user } = useContext(AuthContext)
  const [pieData, setPieData] = useState<CategoryTotal[]>([])
  const [totalSpent, setTotalSpent] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const onError = (msg: string, error?: PostgrestError | unknown) => {
    setPieData([])
    setTotalSpent(0)
    setIsLoading(false)
    console.log(msg + ': ' + error)
  }

  useFocusEffect(
    useCallback(() => {
      const loadCategoryTotals = async () => {
        if (!user) {
          onError('User not found')
          return
        }

        setIsLoading(true)

        try {
          const { data: lists, error: listError } = await supabase
            .from('lists')
            .select('id')
            .eq('uid', user.id)

          if (listError) {
            onError('Error fetching lists for donut chart', listError)
            return
          }

          const listIds = (lists ?? []).map((list: any) => list.id).filter(Boolean)

          if (!listIds.length) {
            setPieData([])
            setTotalSpent(0)
            return
          }

          const { data: items, error: itemError } = await supabase
            .from('items')
            .select('price, quantity, checked, categories(id, title, color), lists!lid(scheduled)')
            .in('lid', listIds)

          if (itemError) {
            onError('Error fetching items for donut chart', itemError)
            return
          }

          const groupedByCategory = (items ?? []).reduce(
            (acc: Record<string, { title: string; amount: number; color: string }>, item: any) => {
              if (!item.checked) return acc

              const scheduled = item.lists?.scheduled
              if (!scheduled) return acc

              const date = new Date(scheduled)
              if (Number.isNaN(date.getTime()) || !isDateInFilterRange(date, filter)) return acc

              const price = Number(item.price ?? 0)
              const quantity = Number(item.quantity ?? 1)
              const amount = price * quantity
              if (!amount || Number.isNaN(amount)) return acc

              const category =
                item.categories ?? {
                  id: 'uncategorized',
                  title: 'Uncategorized',
                  color: '#FFFFFF',
                }

              const key = category.id ?? category.title ?? 'uncategorized'

              if (!acc[key]) {
                acc[key] = {
                  title: category.title ?? 'Uncategorized',
                  amount,
                  color: category.color,
                }
              } else {
                acc[key].amount += amount
              }

              return acc
            },
            {}
          )

          const formattedData = Object.values(groupedByCategory).map(category => ({
            text: category.title,
            value: category.amount,
            color: category.color + 'B2',
          }))

          setPieData(formattedData)
          setTotalSpent(
            formattedData.reduce((sum, item) => sum + item.value, 0)
          )
        } catch (error) {
          onError('Unexpected error loading donut chart data', error)
        } finally {
          setIsLoading(false)
        }
      }

      loadCategoryTotals()
    }, [user, filter])
  )

  return { pieData, totalSpent, isLoading }
}

export default useCategoryTotals
