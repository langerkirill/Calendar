/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Reminder from './Reminder'
import Modal from '../helpers/Modal'
import { deleteReminder, addReminder, updateReminder } from '../../../actions/reminderActions'
import { isReminderPresent, sortRemindersByTime } from '../../../utils/dayUtils'
import { formatReminderTime, formatSelectedDay } from '../../../utils/momentUtils'
import '../../styling/Day.css'

class Day extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reminders: [],
            modal: false,
            selectedReminder: null
        }
        this.mapReminders = this.mapReminders.bind(this)
        this.findRelevantReminders = this.findRelevantReminders.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        const { reminders } = this.props
        this.findRelevantReminders(reminders)
    }

    componentDidUpdate(prevProps) {
        const { reminders, monthNumber } = this.props
        if (reminders !== prevProps.reminders || monthNumber !== prevProps.monthNumber) {
            this.findRelevantReminders(reminders)
        }
    }

    formatReminder(reminder) {
        const { dayNumber, monthNumber, calendarYear, reminders } = this.props
        const day = reminder.reminderDay ? reminder.reminderDay : dayNumber
        const reminderTime = formatReminderTime(calendarYear, monthNumber, day, reminder.reminderTime)
        reminder.reminderTime = reminderTime
        if (!reminder.id) reminder.id = reminders.length + 1
        return reminder
    }

    findRelevantReminders(reminders) {
        const { dayNumber, monthNumber, calendarYear } = this.props
        let filteredReminders = isReminderPresent(reminders, dayNumber, monthNumber, calendarYear)
        filteredReminders = filteredReminders.filter((reminder) => reminder != null)
        const sortedReminders = filteredReminders.sort((first, second) =>
            sortRemindersByTime(first.reminderTime, second.reminderTime))
        this.setState({ reminders: sortedReminders })
    }

    handleClick(event) {
        if (event.target.className === 'day-box') {
            this.setState({ modal: true })
        }
    }

    handleDelete(reminder) {
        const { removeReminder } = this.props
        removeReminder(reminder)
    }

    handleSubmit(reminder) {
        this.formatReminder(reminder)
        const { editReminder, createReminder } = this.props
        const { selectedReminder } = this.state
        if (selectedReminder) {
            editReminder(reminder)
            this.setState({ selectedReminder: null })
        } else {
            createReminder(reminder)
        }
    }

    handleUpdate(selectedReminder){
        this.setState({ selectedReminder, modal: true })
    }

    mapReminders() {
        const { reminders } = this.state
        if (reminders.length > 0) {
            return reminders.map((reminder, i) => 
                <Reminder
                    handleDelete={this.handleDelete}
                    handleUpdate={this.handleUpdate}
                    key={reminder.reminderTime} 
                    i={i} 
                    reminder={reminder}/>)
        }
        return null
    }

    render() {
        const { isDisabled, 
                dayNumber, 
                monthNumber, 
                onlyCurrentMonthDays, 
                calendarYear } = this.props
        const { selectedReminder, modal } = this.state
        const dayBackground = isDisabled ? 'grey' : 'white'
        const firstWord = selectedReminder ? 'Update' : 'Schedule'

        return (
            <Fragment>
                {
                    modal 
                    ? <Modal
                        firstWord={firstWord}
                        onlyCurrentMonthDays={onlyCurrentMonthDays}
                        selectedReminder={selectedReminder}
                        onSubmit={this.handleSubmit}
                        title={`${firstWord} your reminder for ${formatSelectedDay(calendarYear, monthNumber, dayNumber)} below:`}
                        handleClose={() => this.setState({ modal: false })} /> 
                    : null
                }
                <td
                    onClick={
                        isDisabled
                            ? null
                            : (e) => this.handleClick(e)
                    }
                    className={`week-row ${dayBackground}`}>
                    <div className='day-number 1'>{dayNumber}</div>
                    <div className='day-box' >
                        <div className='spacing'></div>
                        {this.mapReminders()}
                    </div>
                </td>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    const reminders = Object.values(state.reminderState)
    return {
        reminders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeReminder: (reminder) => dispatch(deleteReminder(reminder)),
        editReminder: (reminder) => dispatch(updateReminder(reminder)),
        createReminder: (reminder) => dispatch(addReminder(reminder))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Day)