import React from 'react'
import '../../styling/Reminder.css'

const Reminder = (props) => {
    const { reminder, i, handleDelete, handleUpdate } = props
    const { color, reminderTime, reminderTitle } = reminder
    return (
        <div className='event-row' key={i} style={{ backgroundColor: color }}>
            <div className='event-text'>
                <div className='event-time' key={reminderTime._i}>
                    {reminderTime._i.split(' ').slice(1)}
                </div>
                <div className='title-event' key={reminderTitle}>
                    {reminderTitle}
                </div>
            </div>
            <div className='event-buttons'>
                <button 
                    type='button'
                    onClick={() => handleDelete(reminder)}>
                    <i className="fa fa-trash-o"></i>
                </button>
                <button 
                    type='button'
                    onClick={() => handleUpdate(reminder)}>
                    <i className="fa fa-edit"></i>
                </button>
            </div>
        </div >
    )
}

export default Reminder