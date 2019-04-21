import React from 'react'
import { timesArray } from '../../constants/timesArray.js'
import { colorsArray } from '../../constants/colorsArray.js'

const ModalForm = (props) => {
    function timeOptions() {
        return timesArray.map((time, i) => <option key={i}>{time}</option>)
    }

    function dayOptions() {
        return props.onlyCurrentMonthDays.map((day, i) => <option key={i}>{day}</option>)
    }

    function colorOptions() {
        return colorsArray.map((color, i) => <option key={i}>{color}</option>)
    }

    const { handleChange,
            reminderTitle,
            color,
            reminderTime,
            reminderDay } = props

    return (
        <form className='modal-form'>
            <div className='modal-input'>
                <label className='modal-label'> Reminder Name</label>
                <input
                    name='reminderTitle'
                    maxLength='30'
                    className='modal-entry'
                    onChange={handleChange}
                    defaultValue={reminderTitle}>
                </input>
            </div>
            <div className='modal-input'>
                <label className='modal-label'> Reminder Color</label>
                <select
                    value={color}
                    onChange={handleChange}
                    className='modal-entry'
                    style={{ backgroundColor: color }}
                    name='color'>
                    {colorOptions()}
                </select>
            </div>
            <div className='modal-input'>
                <label className='modal-label'> Reminder Time</label>
                <select
                    value={reminderTime}
                    className='modal-entry'
                    name='reminderTime'
                    onChange={handleChange}>
                    {timeOptions()}
                </select>
            </div>
            <div className='modal-input'>
                <label className='modal-label'> Reminder Day of the Month</label>
                <select
                    value={reminderDay}
                    name='reminderDay'
                    className='modal-entry'
                    onChange={handleChange}>
                    {dayOptions()}
                </select>
            </div>
        </form>
    )
}

export default ModalForm