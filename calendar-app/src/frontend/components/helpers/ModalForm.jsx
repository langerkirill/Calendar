/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { timesArray } from '../../../constants/timesArray'
import { colorsArray } from '../../../constants/colorsArray'
import { SELECT_DAY } from '../../../constants/appStrings'

const ModalForm = (props) => {
    const { handleChange,
        reminderTitle,
        color,
        reminderTime,
        reminderDay,
        onlyCurrentMonthDays } = props

    const timeOptions = () => {
        return timesArray.map((time) => <option key={time}>{time}</option>)
    }

    const dayOptions = () => {
        if (onlyCurrentMonthDays[0] !== SELECT_DAY) onlyCurrentMonthDays.unshift(SELECT_DAY)
        return onlyCurrentMonthDays.map((day) => <option key={day}>{day}</option>)
    }

    const colorOptions = () => {
        return colorsArray.map((mapColor) => <option key={mapColor}>{mapColor}</option>)
    }

    return (
        <form className='modal-form'>
            <div className='modal-input'>
                <label className='modal-label'> Name</label>
                <input
                    name='reminderTitle'
                    maxLength='30'
                    className='modal-entry'
                    onChange={handleChange}
                    defaultValue={reminderTitle}/>
            </div>
            <div className='modal-input'>
                <label className='modal-label'> Color</label>
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
                <label className='modal-label'> Time</label>
                <select
                    value={reminderTime}
                    className='modal-entry'
                    name='reminderTime'
                    onChange={handleChange}>
                    {timeOptions()}
                </select>
            </div>
            <div className='modal-input'>
                <label className='modal-label'> Other day of the Month</label>
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