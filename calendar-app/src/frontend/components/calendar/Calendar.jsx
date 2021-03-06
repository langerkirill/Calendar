import React, { Component, Fragment } from 'react'
import Month from './Month'
import { createDateTextArray, addMonthIndex, getCurrentMoment } from '../../../utils/momentUtils'
import { FORWARD, BACKWARD, MONTH } from '../../../constants/appStrings'
import '../../styling/Calendar.css'

export default class Calendar extends Component {

    constructor(props){
        super(props)
        this.state = {
            relativeMoment: null,
            monthIndex: 0, 
            calendarTitle: '',
            calendarYear: ''
        }
    }

    componentDidMount(){
        const relativeMoment = getCurrentMoment()
        this.setCalendarState(relativeMoment)
    }

    setCalendarState(relativeMoment, monthIndex = 0){
        const dateTextArray = createDateTextArray(relativeMoment)
        const calendarTitle = `${dateTextArray[0]} ${dateTextArray[2]}`
        const calendarYear = dateTextArray[2]
        this.setState({ relativeMoment, monthIndex, calendarTitle, calendarYear })
    }

    changeTheMonth(direction) {
        let { monthIndex } = this.state
        monthIndex = direction === FORWARD ? monthIndex + 1 : monthIndex - 1
        const relativeMoment = addMonthIndex(monthIndex, MONTH)
        this.setCalendarState(relativeMoment, monthIndex)
    }

    render() {
        const { relativeMoment } = this.state
        return (
            <Fragment>
                <div className='app-container'>
                    <button
                        type='button'
                        className='month-switch'
                        id='forward'
                        onClick={() => this.changeTheMonth(BACKWARD)}>&laquo; Previous Month</button>
                    {
                        relativeMoment 
                            ? <Month {...this.state}/> 
                            : null
                    }
                    <button 
                        type='button'
                        className='month-switch'
                        id='backward'
                        onClick={() => this.changeTheMonth(FORWARD)} >Next Month&raquo;</button>
                </div>
            </Fragment>
        )
    }
}