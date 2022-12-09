import React from 'react'
import Styles from './calendar.scss'

interface ICalendarProps {
  date: Date
  className?: string
}

export const Calendar = ({ date, className }: ICalendarProps) => {
  return (
  <time className={[Styles.calendarWrap, className].join(' ')}>
    <span data-testid="day" className={Styles.day}>
      {date.getDate().toString().padStart(2, '0')}
    </span>
    <span data-testid="month" className={Styles.month}>
      {date
        .toLocaleString('pt-BR', { month: 'short' })
        .replace('.', '')}
    </span>
    <span data-testid="year" className={Styles.year}>
      {date.getFullYear()}
    </span>
  </time>
  )
}
