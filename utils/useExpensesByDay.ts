import { useCallback, useContext, useState } from 'react'
import { useFocusEffect } from 'expo-router'
import { AuthContext } from './authContext'
import { supabase } from './supabase'
import { ChartFilter, isDateInFilterRange } from './chartFilters'

type UseExpensesByDayReturn = {
  expensesByDay: number[]
  isLoading: boolean
}

const useExpensesByDay = (filter: ChartFilter): UseExpensesByDayReturn => {
  const { user } = useContext(AuthContext)
  const [expensesByDay, setExpensesByDay] = useState<number[]>([0, 0, 0, 0, 0, 0, 0])
  const [isLoading, setIsLoading] = useState(false)

  useFocusEffect(
    useCallback(() => {
      const loadExpensesByDay = async () => {
        if (!user) return

        setIsLoading(true)

        try {
          const { data: lists, error } = await supabase
            .from('lists')
            .select('id, scheduled')
            .eq('uid', user.id)

          if (error) {
            console.log(error)
            return
          }

          if (!lists?.length) {
            setExpensesByDay([0, 0, 0, 0, 0, 0, 0])
            return
          }

          const dayTotals = [0, 0, 0, 0, 0, 0, 0]

          lists.forEach(list => {
            const scheduled = list.scheduled
            if (!scheduled) return

            const date = new Date(scheduled)
            if (Number.isNaN(date.getTime()) || !isDateInFilterRange(date, filter)) return

            const dayOfWeek = date.getDay()
            // Convert Sunday (0) to position 6, move others back one position
            const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1

            dayTotals[adjustedDay] += 1
          })

          setExpensesByDay(dayTotals)
        } catch (err) {
          console.log(err)
        } finally {
          setIsLoading(false)
        }
      }

      loadExpensesByDay()
    }, [user, filter])
  )

  return { expensesByDay, isLoading }
}

export default useExpensesByDay
