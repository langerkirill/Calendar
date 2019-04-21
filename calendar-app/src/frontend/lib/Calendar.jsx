import React, { Component, Fragment } from 'react'
import Month from './Month'
import '../styling/calendar.css'
import { createDateTextArray, addMonthIndex, getCurrentMoment } from '../../utils/momentUtils'
import { FORWARD, BACKWARD, MONTH} from '../../constants/appStrings'

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

    setCalendarState(relativeMoment, monthIndex = 0){
        const dateTextArray = createDateTextArray(relativeMoment)
        const calendarTitle = dateTextArray[0] + ' ' + dateTextArray[2]
        const calendarYear = dateTextArray[2]
        this.setState({ relativeMoment, monthIndex, calendarTitle, calendarYear })
    }

    changeTheMonth(direction) {
        const monthIndex = direction === FORWARD
            ? this.state.monthIndex + 1 
            : this.state.monthIndex - 1
        const relativeMoment = addMonthIndex(monthIndex, MONTH)
        this.setCalendarState(relativeMoment, monthIndex)
    }

    componentDidMount(){
        const relativeMoment = getCurrentMoment()
        this.setCalendarState(relativeMoment)
    }

    render() {
        return (
            <Fragment>
                <div className='app-container'>
                    <button onClick={() => this.changeTheMonth(BACKWARD)}>&laquo; Previous</button>
                    {
                        this.state.relativeMoment 
                            ? <Month 
                                calendarTitle={this.state.calendarTitle} 
                                calendarYear={this.state.calendarYear} 
                                relativeMoment={this.state.relativeMoment}/> 
                            : null
                    }
                    <button onClick={() => this.changeTheMonth(FORWARD)} >Next &raquo;</button>
                </div>
            </Fragment>
        )
    }
}