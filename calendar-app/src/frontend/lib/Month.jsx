import React, { Component } from 'react'
import Week from './Week'
import { weekDayNames } from '../components/WeekDayNames'
import { generateCalendarDaysAndMonth,
        countRemainingDays,
        generateCurrentMonthDays,
        generateMonthArray } from '../../utils/monthUtils'
import { getDaysInMonth, getFirstDayOfCurrentMonth, getDaysInLastMonth } from '../../utils/momentUtils'
import '../styling/Month.css'

class Month extends Component {

    constructor(props) {
        super(props)
        this.state = {
            onlyCurrentMonthDays: [],
            allDaysInCalendar: [],
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
        const { relativeMoment } = this.props
        const daysInCurrentMonth = getDaysInMonth(relativeMoment)
        const firstDayOfCurrentMonth = getFirstDayOfCurrentMonth(relativeMoment)
        const daysInLastMonth = getDaysInLastMonth(relativeMoment)
        const allDaysInCalendar = this.generateCurrentMonthDays(daysInCurrentMonth)
        const monthArray = generateMonthArray(daysInCurrentMonth, monthNumber)
        const lastMonthDaysRemaining = countRemainingDays(firstDayOfCurrentMonth)
        generateCalendarDaysAndMonth(allDaysInCalendar, lastMonthDaysRemaining, daysInLastMonth, monthArray)
        this.setState({ allDaysInCalendar, monthArray })
    }

    componentDidUpdate(prevProps) {
        if (this.props.relativeMoment !== prevProps.relativeMoment) {
            const monthNumber = this.props.relativeMoment.month()
            this.getCalendarOutlook(monthNumber)
        }
    }

    componentDidMount() {
        const monthNumber = this.props.relativeMoment.month() 
        this.getCalendarOutlook(monthNumber)
    }

    mapWeeks() {
        const { monthArray, allDaysInCalendar, onlyCurrentMonthDays } = this.state
        let weekSliceIndex = 0
        const weeks = []
        while (weekSliceIndex <= 42) {
            weeks.push(
                <Week
                    {...this.props}
                    key={weekSliceIndex}
                    onlyCurrentMonthDays={onlyCurrentMonthDays}
                    monthArray={monthArray.slice(weekSliceIndex, weekSliceIndex + 7)}
                    dayNumbers={allDaysInCalendar.slice(weekSliceIndex, weekSliceIndex + 7)} />
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