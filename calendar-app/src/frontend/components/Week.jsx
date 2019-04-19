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

    handleClick(dayNumber) {
        this.setState({ modal: true, dayNumber })
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

    render() {
        return (
            <Fragment>
                {this.state.modal ? <Modal
                    onSubmit={this.handleSumbit}
                    title={`Schedule your event for the selected day (${this.state.dayNumber}) below:`}
                    handleClose={() => this.setState({ modal: false })} /> : null}
                <Day
                    onClick={() => this.handleClick(this.props.dayNumbers[0])}
                    dayNumber={this.props.dayNumbers[0]} />
                <Day
                    onClick={() => this.handleClick(this.props.dayNumbers[1])}
                    dayNumber={this.props.dayNumbers[1]} />
                <Day
                    onClick={() => this.handleClick(this.props.dayNumbers[2])}
                    dayNumber={this.props.dayNumbers[2]} />
                <Day
                    onClick={() => this.handleClick(this.props.dayNumbers[3])}
                    dayNumber={this.props.dayNumbers[3]} />
                <Day
                    onClick={() => this.handleClick(this.props.dayNumbers[4])}
                    dayNumber={this.props.dayNumbers[4]} />
                <Day
                    onClick={() => this.handleClick(this.props.dayNumbers[5])}
                    dayNumber={this.props.dayNumbers[5]} />
                <Day
                    onClick={() => this.handleClick(this.props.dayNumbers[6])}
                    dayNumber={this.props.dayNumbers[6]} />
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