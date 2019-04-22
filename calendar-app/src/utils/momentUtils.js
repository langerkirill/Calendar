import moment from 'moment'

export const createDateTextArray = (relativeMoment) => {
    return moment(relativeMoment).format('LL').split(' ')
}

export const addMonthIndex = (monthIndex, MONTH) => {
    return moment().add(monthIndex, MONTH)
}

export const getCurrentMoment = () => {
    return moment()
}

export const getCurrentMonthNumber = (givenMoment) => {
    return givenMoment.month()
}

export const getDaysInMonth = (givenMoment) => {
    return givenMoment.daysInMonth()
}

export const getFirstDayOfCurrentMonth = (givenMoment) => {
    return givenMoment.startOf('month').format('dddd')
}

export const getDaysInLastMonth = (givenMoment) => {
    return givenMoment.subtract(1, 'month').daysInMonth()
}

export const formatReminderTime = (calendarYear, monthNumber, day, reminderTime) => {
    return moment(`${calendarYear}-${monthNumber}-${day} ${reminderTime}`, "YYYY-MM-DD HH:mm A")
}

export const formatSelectedDay = (calendarYear, monthNumber, dayNumber) => {
    return moment(`${calendarYear}-${monthNumber + 1}-${dayNumber}`, 'YYYY-MM-DD').format('LL')
}