import React, { Fragment } from 'react'
import Day from './Day'
import '../styling/Week.css'

const Week = (props) => {
    const { dayNumbers, calendarYear, onlyCurrentMonthDays, monthArray } = props

    function mapDays() {
        return dayNumbers.map((dayNumber, i) =>
            <Day
                calendarYear={calendarYear}
                onlyCurrentMonthDays={onlyCurrentMonthDays}
                isDisabled={monthArray[i] === null ? true : false}
                monthNumber={monthArray[i]}
                key={dayNumber}
                dayNumber={dayNumber} />)
    }

    return (
        <Fragment>
            {mapDays()}
        </Fragment>
    )
}

export default Week