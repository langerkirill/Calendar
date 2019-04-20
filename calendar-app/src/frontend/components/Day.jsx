import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import '../styling/Day.css'
import { deleteReminder, addReminder, updateReminder } from '../../actions/reminderActions'
import Modal from './Modal'
import moment from 'moment'

class Day extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reminders: [],
            modal: false,
            selectedReminder: null
        }
        this.presentReminders = this.presentReminders.bind(this)
        this.findRelevantReminders = this.findRelevantReminders.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    isBeforeOrAfter(first, second) {
        return first < second ? -1 : first > second ? 1 : 0;
    }

    handleClick(event, dayNumber, monthNumber) {
        if (event.target.className === 'day-box') {
            this.setState({ modal: true, dayNumber, monthNumber })
        }
    }

    handleDelete(event, reminder) {
        this.props.deleteReminder(reminder)
    }

    formatReminder(reminder) {
        const day = this.state.dayNumber
        const month = this.state.monthNumber
        const year = 2019
        const reminderTime = moment(`${year}-${month}-${day} ${reminder.reminderTime}`, "YYYY-MM-DD HH:mm A")
        debugger
        reminder['reminderTime'] = reminderTime
        if (!reminder.id) reminder['id'] = this.props.reminders.length + 1
        return reminder
    }

    handleSubmit(reminder) {
        this.formatReminder(reminder)
        debugger
        this.state.selectedReminder == null
        ? this.props.addReminder(reminder)
        : this.props.updateReminder(reminder)
        if (this.state.selectedReminder) {
            this.setState({ selectedReminder: null })
        }
    }

    handleUpdate(event, reminder){
        const selectedReminder = reminder
        this.setState({ selectedReminder, modal: true })
    }

    findRelevantReminders(reminders) {
        const that = this
        let filteredReminders = reminders.map((reminder) => {
            if (reminder.reminderTime.date() === that.props.dayNumber) {
                if (reminder.reminderTime.month() + 1 === that.props.monthNumber) {
                    return reminder
                }
            }
            return null
        })
        filteredReminders = filteredReminders.filter((reminder) => reminder != null)
        const sortedReminders = filteredReminders.sort((first, second) => this.isBeforeOrAfter(first.reminderTime, second.reminderTime))
        return sortedReminders
    }

    presentReminders() {
        if (this.state.reminders.length > 0) {
            return this.state.reminders.map((reminder, i) => {
                const time = reminder.reminderTime._i.split(' ').slice(1)
                return (
                    <div className='event-row' key={i} style={{ backgroundColor: reminder.color }}>
                        <div className='event-text'>
                            <div className='event-time' key={reminder.reminderTime._i}>{time.join(' ')}</div>
                            <div className='title-event' key={reminder.reminderTitle}>{reminder.reminderTitle}</div>
                        </div>
                        <div className='event-buttons'>
                            <button onClick={(event) => this.handleDelete(event, reminder)} key={-i}>
                                <i class="fa fa-trash-o"></i>
                            </button>
                            <button onClick={(event) => this.handleUpdate(event, reminder)}>
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
        const reminders = this.props.reminders
        const monthNumber = this.props.monthNumber
        if (reminders !== prevProps.reminders || monthNumber !== prevProps.monthNumber) {
            const relevantReminders = this.findRelevantReminders(reminders)
            this.setState({ reminders: relevantReminders })
        }
    }

    selectedDay(){
        return moment(`${2019}-${this.props.monthNumber}-${this.props.dayNumber}`).format('LL')
    }

    render() {
        const isDisabled = this.props.isDisabled
        const dayBackground = isDisabled ? 'grey' : 'white'
        const firstWord = this.state.selectedReminder ? 'Update' : 'Schedule'

        return (
            <Fragment>
                {this.state.modal ? <Modal
                    selectedReminder={this.state.selectedReminder}
                    onSubmit={this.handleSubmit}
                    title={`${firstWord} your reminder for ${this.selectedDay()} below:`}
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
                        {this.presentReminders()}
                    </div>
                </td>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    let reminders = Object.values(state.reminderState)
    return {
        reminders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteReminder: (reminder) => dispatch(deleteReminder(reminder)),
        updateReminder: (reminder) => dispatch(updateReminder(reminder)),
        addReminder: (reminder) => dispatch(addReminder(reminder))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Day);