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

export const getDaysInMonth = (givenMoment) => {
    return givenMoment.daysInMonth()
}

export const getFirstDayOfCurrentMonth = (givenMoment) => {
    return givenMoment.startOf('month').format('dddd')
}

export const getDaysInLastMonth = (givenMoment) => {
    return givenMoment.subtract(1, 'month').daysInMonth()
}