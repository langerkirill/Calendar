import React, { Component } from 'react'
import '../styling/month.css'
import Week from '../components/Week'
import WeekDayNames from '../components/WeekDayNames'

class Month extends Component {

    constructor(props) {
        super(props)
        this.state = {
            daysInMonth: [],
            daysInCalendar: [],
            monthArray: [],
        }
    }

    loadTheDays(daysInCalendar, daysToFill, daysInLastMonth, monthArr){
        while (daysToFill > 0) {
            monthArr.unshift(null)
            daysInCalendar.unshift(daysInLastMonth)
            daysInLastMonth--
            daysToFill--
        }

        let i = 1;
        while (daysInCalendar.length < 42) {
            daysInCalendar.push(i)
            monthArr.push(null)
            i++
        }

        return daysInCalendar
    }

    divideUpDays(firstDay, daysInLastMonth, daysInCalendar, monthArr){
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
        return this.loadTheDays(daysInCalendar, daysToFill, daysInLastMonth, monthArr)
    }

    getdaysInCalendar(daysInMonth){
        const arrDays = []

        while (daysInMonth) {
            const current = daysInMonth
            arrDays.unshift(current)
            daysInMonth--
        }
        const totalDays = arrDays.slice()
        this.setState({ daysInMonth: totalDays })
        return arrDays
    }

    getMonthArray(daysInMonth, monthNumber){
        const monthArr = []
        while (daysInMonth) {
            monthArr.unshift(monthNumber - 1)
            daysInMonth--
        }
        return monthArr
    }

    getCalendarOutlook(monthNumber){
        const daysInMonth = this.props.relativeMoment.daysInMonth()
        const daysInLastMonth = this.props.relativeMoment.subtract(1, 'month').daysInMonth()
        const firstDay = this.props.relativeMoment.startOf('month').format('dddd')
        const daysInCalendar = this.getdaysInCalendar(daysInMonth)
        const monthArray = this.getMonthArray(daysInMonth, monthNumber)
        this.divideUpDays(firstDay, daysInLastMonth, daysInCalendar, monthArray)
        this.setState({ daysInCalendar, monthArray })
    }

    componentDidUpdate(prevProps){
        if (this.props.relativeMoment._d !== prevProps.relativeMoment._d) {
            const monthNumber = this.props.relativeMoment.month() + 1
            this.setState({ monthNumber })
            this.getCalendarOutlook(monthNumber)
        }
    }

    componentDidMount() {
        const monthNumber = this.props.relativeMoment.month() + 1
        this.getCalendarOutlook(monthNumber)
    }

    mapWeeks(){
        let i = 0
        const weeks = []
        while (i <= 42) {
                weeks.push(<Week
                    daysInMonth={this.state.daysInMonth}
                    currentMonthNumber={this.props.currentMonthNumber}
                    monthArray={this.state.monthArray.slice(i, i + 7)}
                    dayNumbers={this.state.daysInCalendar.slice(i, i + 7)} />)
            i += 7
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
                                <WeekDayNames />
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