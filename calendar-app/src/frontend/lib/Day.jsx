import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Reminder from './Reminder'
import Modal from '../components/Modal'
import { deleteReminder, addReminder, updateReminder } from '../../actions/reminderActions'
import { isReminderPresent, sortRemindersByTime } from '../../utils/dayUtils'
import { formatReminderTime, formatSelectedDay } from '../../utils/momentUtils'
import '../styling/Day.css'

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
        let { reminders } = this.props
        reminders = this.findRelevantReminders(reminders)
        this.setState({ reminders })
    }

    componentDidUpdate(prevProps) {
        let { reminders, monthNumber } = this.props
        if (reminders !== prevProps.reminders || monthNumber !== prevProps.monthNumber) {
            reminders = this.findRelevantReminders(reminders)
            this.setState({ reminders })
        }
    }

    formatReminder(reminder) {
        const { dayNumber, monthNumber, calendarYear } = this.props
        const day = reminder.reminderDay ? reminder.reminderDay : dayNumber
        const reminderTime = formatReminderTime(calendarYear, monthNumber, day, reminder.reminderTime)
        reminder['reminderTime'] = reminderTime
        if (!reminder.id) reminder['id'] = this.props.reminders.length + 1
        return reminder
    }

    findRelevantReminders(reminders) {
        const { dayNumber, monthNumber, calendarYear } = this.props
        let filteredReminders = isReminderPresent(reminders, dayNumber, monthNumber, calendarYear)
        filteredReminders = filteredReminders.filter((reminder) => reminder != null)
        const sortedReminders = filteredReminders.sort((first, second) =>
            sortRemindersByTime(first.reminderTime, second.reminderTime))
        return sortedReminders
    }

    handleClick(event, dayNumber, monthNumber) {
        if (event.target.className === 'day-box') {
            this.setState({ modal: true, dayNumber, monthNumber })
        }
    }

    handleDelete(reminder) {
        this.props.deleteReminder(reminder)
    }

    handleSubmit(reminder) {
        this.formatReminder(reminder)
        if (this.state.selectedReminder) {
            this.props.updateReminder(reminder)
            this.setState({ selectedReminder: null })
        } else {
            this.props.addReminder(reminder)
        }
    }

    handleUpdate(selectedReminder){
        this.setState({ selectedReminder, modal: true })
    }

    mapReminders() {
        if (this.state.reminders.length > 0) {
            return this.state.reminders.map((reminder, i) => 
                <Reminder
                    handleDelete={this.handleDelete}
                    handleUpdate={this.handleUpdate}
                    key={i} 
                    i={i} 
                    reminder={reminder}/>)
        }
    }

    render() {
        const { isDisabled, 
                dayNumber, 
                monthNumber, 
                onlyCurrentMonthDays, 
                calendarYear } = this.props
        const dayBackground = isDisabled ? 'grey' : 'white'
        const firstWord = this.state.selectedReminder ? 'Update' : 'Schedule'

        return (
            <Fragment>
                {
                    this.state.modal 
                    ? <Modal
                        firstWord={firstWord}
                        onlyCurrentMonthDays={onlyCurrentMonthDays}
                        selectedReminder={this.state.selectedReminder}
                        onSubmit={this.handleSubmit}
                        title={`${firstWord} your reminder for ${formatSelectedDay(calendarYear, monthNumber, dayNumber)} below:`}
                        handleClose={() => this.setState({ modal: false })} /> 
                    : null
                }
                <td
                    onClick={
                        isDisabled
                            ? null
                            : (e) => this.handleClick(e, dayNumber, monthNumber)
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