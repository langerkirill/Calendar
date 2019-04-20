import React, { Component, Fragment } from 'react'
import Month from './Month'
import moment from 'moment'
import '../styling/calendar.css'

export default class Calendar extends Component {

    constructor(props){
        super(props)
        this.state = {
            relativeMoment: null,
            monthNumber: 1, 
            calendarTitle: ''
        }
        this.changeTheMonth = this.changeTheMonth.bind(this)
    }

    changeTheMonth(direction) {
        const monthNumber = direction === 'forward' 
            ? this.state.monthNumber + 1 
            : this.state.monthNumber - 1
        const relativeMoment = moment().add(monthNumber, 'M')
        const calendarTitleArray = moment().add(monthNumber - 1, 'M').format('LL').split(' ')
        const calendarTitle = calendarTitleArray[0] + ' ' + calendarTitleArray[2]
        this.setState({ relativeMoment, monthNumber, calendarTitle })
    }

    componentDidMount(){
        const relativeMoment = moment().add(1, 'M')
        const calendarTitleArray = moment().format('LL').split(' ')
        const calendarTitle = calendarTitleArray[0] + ' ' + calendarTitleArray[2]
        this.setState({ relativeMoment, calendarTitle })
    }

    render() {
        return (
            <Fragment>
                <div className='app-container'>
                    <a href="#" onClick={() => this.changeTheMonth('backward')}>&laquo; Previous</a>
                    {
                        this.state.relativeMoment 
                            ? <Month 
                                calendarTitle={this.state.calendarTitle} 
                                relativeMoment={this.state.relativeMoment}/> 
                            : null
                    }
                    <a onClick={() => this.changeTheMonth('forward')} href="#" >Next &raquo;</a>
                </div>
            </Fragment>
        )
    }
}