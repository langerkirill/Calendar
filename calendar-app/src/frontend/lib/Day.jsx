import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import '../styling/Day.css'
import { deleteReminder, addReminder, updateReminder } from '../../actions/reminderActions'
import { isReminderPresent, sortMomentsByTime } from '../../utils/dayUtils'
import Modal from '../components/Modal'
import Reminder from './Reminder'
import moment from 'moment'

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
        const reminderTime = moment(`${calendarYear}-${monthNumber}-${day} ${reminder.reminderTime}`, "YYYY-MM-DD HH:mm A")
        reminder['reminderTime'] = reminderTime
        if (!reminder.id) reminder['id'] = this.props.reminders.length + 1
        return reminder
    }

    findRelevantReminders(reminders) {
        const { dayNumber, monthNumber, calendarYear } = this.props
        let filteredReminders = isReminderPresent(reminders, dayNumber, monthNumber, calendarYear)
        filteredReminders = filteredReminders.filter((reminder) => reminder != null)
        const sortedReminders = filteredReminders.sort((first, second) =>
            sortMomentsByTime(first.reminderTime, second.reminderTime))
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
        this.state.selectedReminder == null
        ? this.props.addReminder(reminder)
        : this.props.updateReminder(reminder)
        if (this.state.selectedReminder) {
            this.setState({ selectedReminder: null })
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

    selectedDay(){
        const { calendarYear, monthNumber, dayNumber } = this.props
        return moment(`${calendarYear}-${monthNumber + 1}-${dayNumber}`, 'YYYY-MM-DD').format('LL')
    }

    render() {
        const isDisabled = this.props.isDisabled
        const dayBackground = isDisabled ? 'grey' : 'white'
        const firstWord = this.state.selectedReminder ? 'Update' : 'Schedule'

        return (
            <Fragment>
                {
                    this.state.modal 
                    ? <Modal
                        daysInCurrentMonth={this.props.daysInCurrentMonth}
                        selectedReminder={this.state.selectedReminder}
                        onSubmit={this.handleSubmit}
                        title={`${firstWord} your reminder for ${this.selectedDay()} below:`}
                        handleClose={() => this.setState({ modal: false })} /> 
                    : null
                }
                <td
                    onClick={
                        isDisabled
                            ? null
                            : (e) => this.handleClick(e, this.props.dayNumber, this.props.monthNumber)
                    }
                    className={`week-row ${dayBackground}`}>
                    <div className='day-number 1'>{this.props.dayNumber}</div>
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