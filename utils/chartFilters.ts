export type ChartFilter = '7D' | '1M' | '3M' | '1Y' | 'All'

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())
const endOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999)

export const getFilterRange = (filter: ChartFilter) => {
  const now = new Date()
  const end = endOfDay(now)

  if (filter === 'All') {
    return { from: null, to: null }
  }

  if (filter === '7D') {
    const day = now.getDay()
    const offset = (day + 6) % 7
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - offset)
    return { from: startOfDay(start), to: end }
  }

  if (filter === '1M') {
    const start = new Date(now.getFullYear(), now.getMonth(), 1)
    return { from: startOfDay(start), to: end }
  }

  if (filter === '3M') {
    const start = new Date(now.getFullYear(), now.getMonth() - 2, 1)
    return { from: startOfDay(start), to: end }
  }

  if (filter === '1Y') {
    const start = new Date(now.getFullYear(), 0, 1)
    return { from: startOfDay(start), to: end }
  }

  return { from: null, to: null }
}

export const isDateInFilterRange = (date: Date, filter: ChartFilter) => {
  if (filter === 'All') return true
  const { from, to } = getFilterRange(filter)
  if (!from || !to) return true
  return date >= from && date <= to
}
