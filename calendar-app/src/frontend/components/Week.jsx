import React, { Component, Fragment } from 'react'
import '../styling/week.css'
import Modal from './Modal'
import Day from './Day'
import { connect } from 'react-redux'
import { addEvent } from '../../actions/eventActions'
import moment from 'moment'

class Week extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            dayNumber: null,
            monthNumber: null
        }
        this.handleSumbit = this.handleSumbit.bind(this)
    }

    handleClick(event, dayNumber, monthNumber) {
        debugger
        if (event.target.className === 'day-box') {
            this.setState({ modal: true, dayNumber, monthNumber })
        }
    }

    formatTime(event, props) {
        const day = this.state.dayNumber
        const month = this.state.monthNumber
        const year = 2019
        const eventTime = moment(`${year}-${month}-${day} ${event.eventTime}`, "YYYY-MM-DD HH:mm A")
        event['eventTime'] = eventTime
        return event
    }

    handleSumbit(event, props) {
        this.formatTime(event, props)
        this.props.addEvent(event)
    }

    mapDays(){
        return this.props.dayNumbers.map((dayNumber, i) => 
            <Day
                isDisabled={this.props.monthArray[i] === null ? true : false}
                monthNumber={this.props.monthArray[i]}
                key={dayNumber}
                handleClick={(e) => this.handleClick(e, dayNumber, this.props.monthArray[i])}
                dayNumber={dayNumber} />)
            
    }

    render() {
        return (
            <Fragment>
                {this.state.modal ? <Modal
                    onSubmit={this.handleSumbit}
                    title={`Schedule your event for the selected day (${this.state.dayNumber}) below:`}
                    handleClose={() => this.setState({ modal: false })} /> : null}
                {this.mapDays()}
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addEvent: (event) => dispatch(addEvent(event))
    }
}

export default connect(null, mapDispatchToProps)(Week);