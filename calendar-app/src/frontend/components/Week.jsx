import React, { Component, Fragment } from 'react'
import '../styling/week.css'
import Day from './Day'

class Week extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dayNumber: null,
            monthNumber: null
        }
    }

    mapDays(){
        return this.props.dayNumbers.map((dayNumber, i) => 
            <Day
                daysInMonth={this.props.daysInMonth}
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