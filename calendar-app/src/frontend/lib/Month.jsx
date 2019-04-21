import React, { Component } from 'react'
import Week from './Week'
import { weekDayNames } from '../components/WeekDayNames'
import { generateCalendarDaysAndMonth,
        countRemainingDays,
        generateCurrentMonthDays,
        generateMonthArray } from '../../utils/monthUtils'
import { getDaysInMonth, getFirstDayOfCurrentMonth, getDaysInLastMonth } from '../../utils/momentUtils'
import '../styling/month.css'

class Month extends Component {

    constructor(props) {
        super(props)
        this.state = {
            onlyCurrentMonthDays: [],
            daysInCalendar: [],
            monthArray: [],
        }
    }

    generateCurrentMonthDays(daysInCurrentMonth) {
        const currentMonthDays = generateCurrentMonthDays(daysInCurrentMonth)
        const onlyCurrentMonthDays = currentMonthDays.slice()
        this.setState({ onlyCurrentMonthDays })
        return currentMonthDays
    }

    getCalendarOutlook(monthNumber) {
        const daysInCurrentMonth = getDaysInMonth(this.props.relativeMoment)
        const firstDayOfCurrentMonth = getFirstDayOfCurrentMonth(this.props.relativeMoment)
        const daysInLastMonth = getDaysInLastMonth(this.props.relativeMoment)
        const daysInCalendar = this.generateCurrentMonthDays(daysInCurrentMonth)
        const monthArray = generateMonthArray(daysInCurrentMonth, monthNumber)
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
        const { monthArray, daysInCalendar, onlyCurrentMonthDays } = this.state
        let weekSliceIndex = 0
        const weeks = []
        while (weekSliceIndex <= 42) {
            weeks.push(
                <Week
                    key={weekSliceIndex}
                    calendarYear={this.props.calendarYear}
                    onlyCurrentMonthDays={onlyCurrentMonthDays}
                    currentMonthNumber={this.props.currentMonthNumber}
                    monthArray={monthArray.slice(weekSliceIndex, weekSliceIndex + 7)}
                    dayNumbers={daysInCalendar.slice(weekSliceIndex, weekSliceIndex + 7)} />
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