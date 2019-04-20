import React, { Component, Fragment } from 'react'
import Day from './Day'
import '../styling/week.css'

class Week extends Component {
    mapDays(){
        return this.props.dayNumbers.map((dayNumber, i) => 
            <Day
                calendarYear={this.props.calendarYear}
                daysInCurrentMonth={this.props.daysInCurrentMonth}
                isDisabled={this.props.monthArray[i] === null ? true : false}
                monthNumber={this.props.monthArray[i]}
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