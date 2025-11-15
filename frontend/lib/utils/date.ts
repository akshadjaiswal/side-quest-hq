// Date utility functions using date-fns
import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns'

export function formatDate(date: string | Date | null, formatString = 'MMM d, yyyy'): string {
  if (!date) return 'N/A'

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return isValid(dateObj) ? format(dateObj, formatString) : 'Invalid date'
  } catch (error) {
    return 'Invalid date'
  }
}

export function formatRelativeDate(date: string | Date | null): string {
  if (!date) return 'N/A'

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return isValid(dateObj) ? formatDistanceToNow(dateObj, { addSuffix: true }) : 'Invalid date'
  } catch (error) {
    return 'Invalid date'
  }
}

export function formatDateRange(startDate: string | Date | null, endDate: string | Date | null): string {
  if (!startDate && !endDate) return 'N/A'

  const start = startDate ? formatDate(startDate, 'MMM yyyy') : '?'
  const end = endDate ? formatDate(endDate, 'MMM yyyy') : 'Present'

  return `${start} - ${end}`
}

export function getYearFromDate(date: string | Date | null): string {
  if (!date) return 'N/A'

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return isValid(dateObj) ? format(dateObj, 'yyyy') : 'N/A'
  } catch (error) {
    return 'N/A'
  }
}

export function isOldProject(lastWorkedDate: string | null, monthsThreshold = 6): boolean {
  if (!lastWorkedDate) return false

  try {
    const dateObj = parseISO(lastWorkedDate)
    const monthsAgo = (new Date().getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24 * 30)
    return monthsAgo >= monthsThreshold
  } catch (error) {
    return false
  }
}
