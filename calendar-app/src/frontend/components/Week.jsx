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
            dayNumber: null
        }
        this.handleSumbit = this.handleSumbit.bind(this)
    }

    handleClick(dayNumber, event) {
        if (event.target.className !== 'event-row' && event.target.className !== 'delete-button') {
            this.setState({ modal: true, dayNumber })
        }
    }

    formatTime(event) {
        const year = moment().year()
        let month = moment().month()
        if (month.length === 1) month = "0" + month
        const day = this.state.dayNumber
        const eventTime = moment(`${year}-${month}-${day} ${event.eventTime}`, "YYYY-MM-DD HH:mm A")
        event['eventTime'] = eventTime
        return event
    }

    handleSumbit(event) {
        this.formatTime(event)
        this.props.addEvent(event)
    }

    mapDays(){
        return this.props.dayNumbers.map((dayNumber) => 
            <Day
                key={dayNumber}
                onClick={(e) => this.handleClick(dayNumber, e)}
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