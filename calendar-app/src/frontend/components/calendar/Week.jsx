import React, { Fragment } from 'react'
import Day from './Day'
import '../../styling/Week.css'

const Week = (props) => {
    const { dayNumbers, monthArray } = props

    const mapDays = () => {
        return dayNumbers.map((dayNumber, i) =>
            <Day
                {...props}
                isDisabled={monthArray[i] === null}
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