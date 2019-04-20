import React, { Component } from 'react'
import '../styling/month.css'
import Week from './Week'
import { weekDayNames } from '../components/WeekDayNames'
import { generateCalendarDaysAndMonth, countRemainingDays, generateCurrentMonthDays } from '../../utils/monthUtils'

class Month extends Component {

    constructor(props) {
        super(props)
        this.state = {
            daysInCurrentMonth: [],
            daysInCalendar: [],
            monthArray: [],
        }
    }

    generateCurrentMonthDays(daysInCurrentMonth) {
        const currentMonthDays = generateCurrentMonthDays(daysInCurrentMonth)
        this.setState({ daysInCurrentMonth: currentMonthDays })
        return currentMonthDays
    }

    generateMonthArray(daysInCurrentMonth, monthNumber) {
        const monthArray = []
        while (daysInCurrentMonth) {
            monthArray.unshift(monthNumber)
            daysInCurrentMonth--
        }
        return monthArray
    }

    getCalendarOutlook(monthNumber) {
        const daysInCurrentMonth = this.props.relativeMoment.daysInMonth()
        const firstDayOfCurrentMonth = this.props.relativeMoment.startOf('month').format('dddd')
        const daysInLastMonth = this.props.relativeMoment.subtract(1, 'month').daysInMonth()
        const daysInCalendar = this.generateCurrentMonthDays(daysInCurrentMonth)
        const monthArray = this.generateMonthArray(daysInCurrentMonth, monthNumber)
        const lastMonthDaysRemaining = countRemainingDays(firstDayOfCurrentMonth)
        generateCalendarDaysAndMonth(daysInCalendar, lastMonthDaysRemaining, daysInLastMonth, monthArray)
        this.setState({ daysInCalendar, monthArray })
    }

    componentDidUpdate(prevProps) {
        if (this.props.relativeMoment._d !== prevProps.relativeMoment._d) {
            const monthNumber = this.props.relativeMoment.month()
            this.getCalendarOutlook(monthNumber)
        }
    }

    componentDidMount() {
        const monthNumber = this.props.relativeMoment.month() 
        this.getCalendarOutlook(monthNumber)
    }

    mapWeeks() {
        let weekSliceIndex = 0
        const weeks = []
        while (weekSliceIndex <= 42) {
            weeks.push(
                <Week
                    key={weekSliceIndex}
                    calendarYear={this.props.calendarYear}
                    daysInCurrentMonth={this.state.daysInCurrentMonth}
                    currentMonthNumber={this.props.currentMonthNumber}
                    monthArray={this.state.monthArray.slice(weekSliceIndex, weekSliceIndex + 7)}
                    dayNumbers={this.state.daysInCalendar.slice(weekSliceIndex, weekSliceIndex + 7)} />
            )
            weekSliceIndex += 7
        }
        return weeks
    }

    render() {
        return (
            <div className="calendar-positioner">
                <div className='calendar-container'>
                    <table>
                        <thead className='days-of-week'>
                            <tr className='calendar-title'>
                                <th className='calendar-title'>{this.props.calendarTitle}</th>
                            </tr>
                        </thead>
                        <thead className='days-of-week'>
                            <tr className='day-names'>
                                {weekDayNames()}
                            </tr>
                        </thead>
                        <tbody className='days-display-grid'>
                            <tr className='grid-days'>
                                {this.mapWeeks()}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Month