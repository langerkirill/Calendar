/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { MONDAY, TEUSDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY } from '../constants/appStrings'

export const generateCalendarDaysAndMonth = (daysInCalendar, daysBeforeCurrentMonthBegins, daysInLastMonth, monthDataArray) => {
    while (daysBeforeCurrentMonthBegins > 0) {
        monthDataArray.unshift(null)
        daysInCalendar.unshift(daysInLastMonth)
        daysInLastMonth--
        daysBeforeCurrentMonthBegins--
    }
    let nextMonthDays = 1
    while (daysInCalendar.length < 42) {
        daysInCalendar.push(nextMonthDays)
        monthDataArray.push(null)
        nextMonthDays++
    }
}

export const countRemainingDays = (firstDay) => {
    let daysToFill
    switch (firstDay) {
        case MONDAY:
            daysToFill = 0
            break
        case TEUSDAY:
            daysToFill = 1
            break
        case WEDNESDAY:
            daysToFill = 2
            break
        case THURSDAY:
            daysToFill = 3
            break
        case FRIDAY:
            daysToFill = 4
            break
        case SATURDAY:
            daysToFill = 5
            break
        case SUNDAY:
            daysToFill = 6
            break
        default:
            break
    }
    return daysToFill
}

export const generateCurrentMonthDays = (daysInCurrentMonth) => {
    const arrDays = []
    while (daysInCurrentMonth) {
        const current = daysInCurrentMonth
        arrDays.unshift(current)
        daysInCurrentMonth--
    }
    const totalDays = arrDays.slice()
    return totalDays
}

export const generateMonthArray = (daysInCurrentMonth, monthNumber) => {
    const monthArray = []
    while (daysInCurrentMonth) {
        monthArray.unshift(monthNumber)
        daysInCurrentMonth--
    }
    return monthArray
}