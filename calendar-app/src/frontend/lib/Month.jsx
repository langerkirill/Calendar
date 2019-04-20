import React, { Component } from 'react'
import '../styling/month.css'
import Week from '../components/Week'
import WeekDayNames from '../components/WeekDayNames'

class Month extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dayArray: []
        }
    }

    loadTheDays(firstDay, dayArray, daysToFill, daysInLastMonth){
        while (daysToFill > 0) {
            dayArray.unshift(daysInLastMonth)
            daysInLastMonth--
            daysToFill--
        }

        let i = 1;
        while (dayArray.length < 42) {
            dayArray.push(i)
            i++
        }

        return dayArray
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
        return this.loadTheDays(firstDay, dayArray, daysToFill, daysInLastMonth)
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

    getCalendarOutlook(){
        debugger
        const daysInMonth = this.props.relativeMoment.daysInMonth()
        const daysInLastMonth = this.props.relativeMoment.subtract(1, 'month').daysInMonth()
        const firstDay = this.props.relativeMoment.startOf('month').format('dddd')
        const dayArray = this.getDayArray(daysInMonth)
        this.divideUpDays(firstDay, daysInMonth, daysInLastMonth, dayArray)
        this.setState({ dayArray })
    }

    componentDidUpdate(prevProps){
        debugger
        if (this.props.relativeMoment._d !== prevProps.relativeMoment._d) {
            this.getCalendarOutlook()
        }
    }

    componentDidMount() {
        this.getCalendarOutlook()
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
                                <Week dayNumbers={this.state.dayArray.slice(0,7)} />
                                <Week dayNumbers={this.state.dayArray.slice(7,14)} />
                                <Week dayNumbers={this.state.dayArray.slice(14,21)} />
                                <Week dayNumbers={this.state.dayArray.slice(21,28)} />
                                <Week dayNumbers={this.state.dayArray.slice(28, 35)} />
                                <Week dayNumbers={this.state.dayArray.slice(35)} />
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Month