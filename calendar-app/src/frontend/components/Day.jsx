import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import '../styling/Day.css'
import { deleteEvent } from '../../actions/eventActions'

class Day extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: []
        }
        this.presentEvents = this.presentEvents.bind(this)
    }

    isBeforeOrAfter(first, second) {
        return first < second ? -1 : first > second ? 1 : 0;
    };

    handleDelete(event, calendarEvent) {
        this.props.deleteEvent(calendarEvent)
    }

    findRelevantEvents(events) {
        let filteredEvents = events.map((event) => event.eventTime.date() === this.props.dayNumber ? event : null)
        filteredEvents = filteredEvents.filter((event) => event != null)
        filteredEvents = filteredEvents.map((event) => event.eventTime.month() + 1 === this.props.monthNumber ? event : null)
        filteredEvents = filteredEvents.filter((event) => event != null)
        debugger
        const sortedEvents = filteredEvents.sort((first, second) => this.isBeforeOrAfter(first.eventTime, second.eventTime))
        return sortedEvents
    }

    presentEvents() {
        if (this.state.events.length > 0) {
            return this.state.events.map((calendarEvent, i) => {
                const time = calendarEvent.eventTime._i.split(' ').slice(1)
                return (
                    <div className='event-row' key={i} style={{ backgroundColor: calendarEvent.color }}>
                        <div className='event-time' key={calendarEvent.eventTime._i}>{time.join(' ')}</div>
                        <div className='title-event' key={calendarEvent.eventTitle}>{calendarEvent.eventTitle}</div>
                        <button onClick={(event) => this.handleDelete(event, calendarEvent)} className='delete-button' key={-i}>X</button>
                    </div>
                )
            })
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
            <td onClick={(e) => this.props.handleClick(e)} className='week-row'>
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

const mapDispatchToProps = dispatch => {
    return {
        deleteEvent: (event) => dispatch(deleteEvent(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Day);