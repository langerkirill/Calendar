import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import '../styling/Day.css'
import moment from 'moment'

class Day extends Component {

    constructor(props) {
        super(props)
        this.state = {
            events: []
        }
        this.presentEvents = this.presentEvents.bind(this)
    }

    isBeforeOrAfter (first, second) {
        return first < second ? -1 : first > second ? 1 : 0;
    };

    findRelevantEvents(events) {
        let filteredEvents = events.map((event) => event.eventTime.date() === this.props.dayNumber ? event : null)
        filteredEvents = filteredEvents.filter((event) => event != null)
        const sortedEvents = filteredEvents.sort((first, second) => this.isBeforeOrAfter(first.eventTime, second.eventTime))
        if (sortedEvents.length > 0 ) debugger
        return sortedEvents
    }

    presentEvents() {
        if (this.state.events.length > 0) {
            return this.state.events.map((event, i) =>
                <div className='event-row' key={i}>
                    <div className='title-event' key={event.eventTitle}>{event.eventTitle}</div>
                    <button className='delete-button' key={-i}>X</button>
                </div>
                )
        } else {
            return null
        }
    }

    componentDidUpdate(prevProps) {
        const events = this.props.events;
        if (events != prevProps.events) {
            const relevantEvents = this.findRelevantEvents(events)
            this.setState({ events: relevantEvents })
        }
    }

    render() {
        return (
            <td onClick={(e) => this.props.onClick(e)} className='week-row'>
                <div className='day-number 1'>{this.props.dayNumber}</div>
                <div className='day-box' >
                    <div className='spacing'></div>
                    {this.presentEvents()}
                </div>
            </td>
        )
    }
}


const mapStateToProps = state => {
    let events = Object.values(state.eventState)

    return {
        events
    }
}

export default connect(mapStateToProps)(Day);