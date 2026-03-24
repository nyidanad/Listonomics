import { Dispatch, SetStateAction } from "react"
import { supabase } from "./supabase"

type Props = {
  id: string,
  setInCartCount: Dispatch<SetStateAction<number>>,
  setTotalCost: Dispatch<SetStateAction<number>>,
}

const fetchStats = async ({ id, setInCartCount, setTotalCost }: Props) => {
  const { data, error } = await supabase
    .from('items')
    .select('*, categories(*)')
    .eq('lid', id)
  
  if (error) {
    throw Error('Error fetching items ', error)
  }

  const inCart = data.reduce((count: number, item: any) => {
    return item.checked ? count + 1 : count
  }, 0)

  const costs = data.reduce((sum: number, item: any) => {
    if (!item.checked) return sum

    const price = Number(item.price ?? 0)
    const quantity = Number(item.quantity ?? 1)
    if (Number.isNaN(price) || Number.isNaN(quantity)) return sum

    return sum + price * quantity
  }, 0)

  setInCartCount(inCart)
  setTotalCost(costs)

  console.log('[GET] Stats fetched successfully.')
}

export default fetchStats