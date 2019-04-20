import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import '../styling/Day.css'
import { deleteEvent, addEvent } from '../../actions/eventActions'
import Modal from './Modal'
import moment from 'moment'

class Day extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            modal: false
        }
        this.presentEvents = this.presentEvents.bind(this)
        this.findRelevantEvents = this.findRelevantEvents.bind(this)
        this.handleSumbit = this.handleSumbit.bind(this)
    }

    isBeforeOrAfter(first, second) {
        return first < second ? -1 : first > second ? 1 : 0;
    }

    handleClick(event, dayNumber, monthNumber) {
        if (event.target.className === 'day-box') {
            this.setState({ modal: true, dayNumber, monthNumber })
        }
    }

    handleDelete(event, calendarEvent) {
        this.props.deleteEvent(calendarEvent)
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

    findRelevantEvents(events) {
        const that = this
        let filteredEvents = events.map((event) => {
            if (event.eventTime.date() === that.props.dayNumber) {
                if (event.eventTime.month() + 1 === that.props.monthNumber) {
                    return event
                }
            }
            return null
        })
        filteredEvents = filteredEvents.filter((event) => event != null)
        const sortedEvents = filteredEvents.sort((first, second) => this.isBeforeOrAfter(first.eventTime, second.eventTime))
        return sortedEvents
    }

    presentEvents() {
        if (this.state.events.length > 0) {
            return this.state.events.map((calendarEvent, i) => {
                const time = calendarEvent.eventTime._i.split(' ').slice(1)
                return (
                    <div className='event-row' key={i} style={{ backgroundColor: calendarEvent.color }}>
                        <div className='event-text'>
                            <div className='event-time' key={calendarEvent.eventTime._i}>{time.join(' ')}</div>
                            <div className='title-event' key={calendarEvent.eventTitle}>{calendarEvent.eventTitle}</div>
                        </div>
                        <div className='event-buttons'>
                            <button onClick={(event) => this.handleDelete(event, calendarEvent)} key={-i}>
                                <i class="fa fa-trash-o"></i>
                            </button>
                            <button>
                                <i className="fa fa-edit"></i>
                            </button>
                        </div>
                    </div>
                )
            })
        } else {
            return null
        }
    }

    componentDidUpdate(prevProps) {
        const events = this.props.events
        const monthNumber = this.props.monthNumber
        if (events != prevProps.events || monthNumber != prevProps.monthNumber) {
            const relevantEvents = this.findRelevantEvents(events)
            this.setState({ events: relevantEvents })
        }
    }

    selectedDay(){
        debugger
        return moment(`${2019}-${this.props.monthNumber}-${this.props.dayNumber}`).format('LL')
    }

    render() {

        const isDisabled = this.props.isDisabled
        const dayBackground = isDisabled ? 'grey' : 'white'

        return (
            <Fragment>
                {this.state.modal ? <Modal
                    onSubmit={this.handleSumbit}
                    title={`Schedule your event for ${this.selectedDay()} below:`}
                    handleClose={() => this.setState({ modal: false })} /> : null}
                <td
                    onClick=
                    {
                        isDisabled
                            ? null
                            : (e) => this.handleClick(e, this.props.dayNumber, this.props.monthNumber)
                    }
                    className={`week-row ${dayBackground}`}>
                    <div className='day-number 1'>{this.props.dayNumber}</div>
                    <div className='day-box' >
                        <div className='spacing'></div>
                        {this.presentEvents()}
                    </div>
                </td>
            </Fragment>
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
        deleteEvent: (event) => dispatch(deleteEvent(event)),
        addEvent: (event) => dispatch(addEvent(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Day);