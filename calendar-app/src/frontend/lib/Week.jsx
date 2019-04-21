import React, { Component, Fragment } from 'react'
import Day from './Day'
import '../styling/week.css'

class Week extends Component {
    mapDays(){
        const { dayNumbers, calendarYear, onlyCurrentMonthDays, monthArray } = this.props
        return dayNumbers.map((dayNumber, i) => 
            <Day
                calendarYear={calendarYear}
                onlyCurrentMonthDays={onlyCurrentMonthDays}
                isDisabled={monthArray[i] === null ? true : false}
                monthNumber={monthArray[i]}
                key={dayNumber}
                dayNumber={dayNumber} />)
    }

    render() {
        return (
            <Fragment>
                {this.mapDays()}
            </Fragment>
        )
    }
}

export default Week