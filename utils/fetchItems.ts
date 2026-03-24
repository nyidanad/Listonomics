import { Dispatch, SetStateAction } from "react"
import { supabase } from "./supabase"

type Props = {
  id: string
  setSelectedCategories: Dispatch<SetStateAction<any[]>>
}

const fetchItems = async ({ id, setSelectedCategories }: Props) => {
  try {
    const { data, error } = await supabase
      .from('items')
      .select('*, categories(*)')
      .eq('lid', id)
    
    if (error) {
      throw Error('Error fetching items ', error)
    }

    // Group items by category
    const grouped = data.reduce((acc: any, item: any) => {
      const cat = item.categories
      if (!acc[cat.id]) {
        acc[cat.id] = {
          title: cat.title,
          icon: cat.icon,
          color: cat.color,
          data: []
        }
      }
      acc[cat.id].data.push(item)
      return acc
    }, {})
    
    const sections = Object.values(grouped)
    setSelectedCategories(sections)
  } catch (error) {
    console.error('Error fetching items:', error)
    return;
  }

  console.log('[GET] Items fetched successfully.')
}

export default fetchItems