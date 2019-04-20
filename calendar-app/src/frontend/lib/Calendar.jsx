import React, { Component, Fragment } from 'react'
import Month from './Month'
import moment from 'moment'
import '../styling/calendar.css'

export default class Calendar extends Component {

    constructor(props){
        super(props)
        this.state = {
            relativeMoment: null,
            monthCounter: 0, 
            calendarTitle: '',
            calendarYear: ''
        }
        this.changeTheMonth = this.changeTheMonth.bind(this)
    }

    changeTheMonth(direction) {
        const monthCounter = direction === 'forward' 
            ? this.state.monthCounter + 1 
            : this.state.monthCounter - 1
        const relativeMoment = moment().add(monthCounter, 'M')
        const calendarTitleArray = moment(relativeMoment).format('LL').split(' ')
        const calendarTitle = calendarTitleArray[0] + ' ' + calendarTitleArray[2]
        const calendarYear = calendarTitleArray[2]
        this.setState({ relativeMoment, monthCounter, calendarTitle, calendarYear })
    }

    componentDidMount(){
        const relativeMoment = moment()
        const calendarTitleArray = moment().format('LL').split(' ')
        const calendarTitle = calendarTitleArray[0] + ' ' + calendarTitleArray[2]
        const calendarYear = calendarTitleArray[2]
        this.setState({ relativeMoment, calendarTitle, calendarYear })
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