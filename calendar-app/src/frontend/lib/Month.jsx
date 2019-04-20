import React, { Component } from 'react'
import '../styling/month.css'
import Week from '../components/Week'
import WeekDayNames from '../components/WeekDayNames'

class Month extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dayArray: [],
            monthArray: [],
        }
    }

    loadTheDays(dayArray, daysToFill, daysInLastMonth, monthArr){
        const prependMonth = monthArr[0] - 1
        const appendMonth = monthArr[0] + 1
        while (daysToFill > 0) {
            monthArr.unshift(prependMonth)
            dayArray.unshift(daysInLastMonth)
            daysInLastMonth--
            daysToFill--
        }

        let i = 1;
        while (dayArray.length < 42) {
            dayArray.push(i)
            monthArr.push(appendMonth)
            i++
        }

        return dayArray
    }

    divideUpDays(firstDay, daysInLastMonth, dayArray, monthArr){
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
        return this.loadTheDays(dayArray, daysToFill, daysInLastMonth, monthArr)
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
        const dayArray = this.getDayArray(daysInMonth)
        const monthArray = this.getMonthArray(daysInMonth, monthNumber)
        this.divideUpDays(firstDay, daysInLastMonth, dayArray, monthArray)
        this.setState({ dayArray, monthArray })
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
                                <Week 
                                    monthArray={this.state.monthArray.slice(0,7)}
                                    dayNumbers={this.state.dayArray.slice(0,7)} />
                                <Week 
                                    monthArray={this.state.monthArray.slice(7,14)}
                                    dayNumbers={this.state.dayArray.slice(7,14)} />
                                <Week 
                                    monthArray={this.state.monthArray.slice(14, 21)}
                                    dayNumbers={this.state.dayArray.slice(14,21)} />
                                <Week 
                                    monthArray={this.state.monthArray.slice(21, 28)}
                                    dayNumbers={this.state.dayArray.slice(21,28)} />
                                <Week 
                                    monthArray={this.state.monthArray.slice(28, 35)}
                                    dayNumbers={this.state.dayArray.slice(28, 35)} />
                                <Week 
                                    monthArray={this.state.monthArray.slice(35)}
                                    dayNumbers={this.state.dayArray.slice(35)} />
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Month