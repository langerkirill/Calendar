import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../styling/calendar.css'
import Week from '../components/Week'
import WeekDayNames from '../components/WeekDayNames'
import moment from 'moment'

class Calendar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstWeekDays: [],
            secondWeekDays: [],
            thirdWeekDays: [],
            fourthWeekDays: [],
            fifthWeekDays: [],
        }
    }

    loadTheDays(firstDay, dayArray, daysToFill, daysInLastMonth){
        
        while (daysToFill > 0) {
            dayArray.unshift(daysInLastMonth)
            daysInLastMonth--
            daysToFill--
        }
        console.log(dayArray)
    }

    divideUpDays(firstDay, daysInMonth, daysInLastMonth, dayArray){
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
        this.loadTheDays(firstDay, dayArray, daysToFill, daysInLastMonth)
    }

    getDayArray(daysInMonth){
        const arrDays = []

        while (daysInMonth) {
            const current = daysInMonth
            arrDays.unshift(current)
            daysInMonth--
        }

        return arrDays
    }

    componentDidMount() {
        //get days in the month information
        const daysInMonth = moment().daysInMonth()
        const daysInLastMonth = moment().subtract(1, 'month').daysInMonth()
        const firstDay = moment().startOf('month').format('dddd')
        const dayArray = this.getDayArray(daysInMonth)
        this.divideUpDays('Wednesday', daysInMonth, daysInLastMonth, dayArray)
    }

    render() {
        return (
            <div className="calendar-positioner">
                <div className='calendar-container'>
                    <table>
                        <thead className='days-of-week'>
                            <tr className='day-names'>
                                <WeekDayNames />
                            </tr>
                        </thead>
                        <tbody className='days-display-grid'>
                            <tr className='grid-days'>
                                <Week firstDay={this.state.firstDay} />
                                <Week />
                                <Week />
                                <Week />
                                <Week daysInMonth={this.state.daysInMonth}/>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Calendar