import React, { Component } from 'react'

export default class Reminder extends Component {
    render() {
        const { reminder, i } = this.props
        return (
            <div className='event-row' key={i} style={{ backgroundColor: reminder.color }}>
                <div className='event-text'>
                    <div className='event-time' key={reminder.reminderTime._i}>
                        {reminder.reminderTime._i.split(' ').slice(1)}
                    </div>
                    <div className='title-event' key={reminder.reminderTitle}>
                        {reminder.reminderTitle}
                    </div>
                </div>
                <div className='event-buttons'>
                    <button onClick={() => this.props.handleDelete(reminder)} key={-i}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                    <button onClick={() => this.props.handleUpdate(reminder)}>
                        <i className="fa fa-edit"></i>
                    </button>
                </div>
            </div >
        )
    }
}