export const generateCalendarDaysAndMonth = (daysInCalendar, daysBeforeCurrentMonthBegins, daysInLastMonth, monthDataArray) => {

    while (daysBeforeCurrentMonthBegins > 0) {
        monthDataArray.unshift(null)
        daysInCalendar.unshift(daysInLastMonth)
        daysInLastMonth--
        daysBeforeCurrentMonthBegins--
    }

    let nextMonthDays = 1;
    while (daysInCalendar.length < 42) {
        daysInCalendar.push(nextMonthDays)
        monthDataArray.push(null)
        nextMonthDays++
    }

    return daysInCalendar
}

export const countRemainingDays = (firstDay) => {
    let daysToFill;

    switch (firstDay) {
        case 'Monday':
            daysToFill = 0;
            break;
        case 'Teusday':
            daysToFill = 1;
            break;
        case 'Wednesday':
            daysToFill = 2;
            break;
        case 'Thursday':
            daysToFill = 3;
            break;
        case 'Friday':
            daysToFill = 4;
            break;
        case 'Saturday':
            daysToFill = 5;
            break;
        case 'Sunday':
            daysToFill = 6;
            break;
        default:
            daysToFill = null;
            break;
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