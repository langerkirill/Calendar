import React, { Component, Fragment } from 'react'
import Month from './Month'
import moment from 'moment'
import '../styling/calendar.css'

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
        const dateTextArray = moment(relativeMoment).format('LL').split(' ')
        const calendarTitle = dateTextArray[0] + ' ' + dateTextArray[2]
        const calendarYear = dateTextArray[2]
        this.setState({ relativeMoment, monthIndex, calendarTitle, calendarYear })
    }

    changeTheMonth(direction) {
        const monthIndex = direction === 'forward' 
            ? this.state.monthIndex + 1 
            : this.state.monthIndex - 1
        const relativeMoment = moment().add(monthIndex, 'M')
        this.setCalendarState(relativeMoment, monthIndex)
    }

    componentDidMount(){
        const relativeMoment = moment()
        this.setCalendarState(relativeMoment)
    }

    render() {
        return (
            <Fragment>
                <div className='app-container'>
                    <button onClick={() => this.changeTheMonth('backward')}>&laquo; Previous</button>
                    {
                        this.state.relativeMoment 
                            ? <Month 
                                calendarTitle={this.state.calendarTitle} 
                                calendarYear={this.state.calendarYear} 
                                relativeMoment={this.state.relativeMoment}/> 
                            : null
                    }
                    <button onClick={() => this.changeTheMonth('forward')} >Next &raquo;</button>
                </div>
            </Fragment>
        )
    }
}