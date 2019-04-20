import React, { Component } from 'react'
import '../styling/Modal.css'
import { timesArray } from '../../constants/timesArray.js'
import { colorsArray } from '../../constants/colorsArray.js'

class Modal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            reminderTitle: '',
            reminderTime: '',
            reminderDay: '',
            color: '',
            id: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        if (this.props.selectedReminder) {
            let { reminderTime, reminderTitle, reminderDay, color, id } = this.props.selectedReminder
            reminderTime = reminderTime._i.split(' ')
            reminderTime.shift()
            reminderTime = reminderTime.join(' ')
            this.setState({ reminderTime, reminderTitle, reminderDay, color, id })
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault()
        if (this.state.reminderTime === 'Select a Time' 
            || this.state.reminderTitle === '' 
            || this.state.reminderTime === null) return
        this.props.onSubmit(this.state)
        this.props.handleClose()
    }

    timeOptions() {
        return timesArray.map((time, i) => <option key={i}>{time}</option>)
    }

    dayOptions() {
        return this.props.daysInCurrentMonth.map((day, i) => <option key={i}>{day}</option>)
    }

    colorOptions() {
        return colorsArray.map((color, i) => <option key={i}>{color}</option>)
    }

    render() {
        const { handleClose, title } = this.props

        return (
            <td className='modal-container' >
                <div className='modal-class' >
                    <div className='modal-header'>
                        {title ? <div className='modal-title'>{title}</div> : null}
                    </div>
                    <div className='modal-form-container'>
                        <form className='modal-form'>
                            <div className='modal-input'>
                                <label className='modal-label'> Reminder Name
                                </label>
                                <input 
                                    name='reminderTitle' 
                                    maxLength='30' 
                                    className='modal-entry' 
                                    onChange={(e) => this.handleChange(e)} 
                                    defaultValue={this.state.reminderTitle}>
                                </input>
                            </div>
                            <div className='modal-input'>
                                <label className='modal-label'> Reminder Color
                                </label>
                                <select
                                    value={this.state.color}
                                    onChange={(e) => this.handleChange(e)}
                                    className='modal-entry' 
                                    style={{ backgroundColor: this.state.color }}
                                    name='color'>
                                    {this.colorOptions()}
                                </select>
                            </div>
                            <div className='modal-input'>
                                <label className='modal-label'> Reminder Time
                                </label>
                                <select 
                                    value={this.state.reminderTime}
                                    className='modal-entry' 
                                    name='reminderTime' 
                                    onChange={this.handleChange}>
                                    {this.timeOptions()}
                                </select>
                            </div>
                            <div className='modal-input'>
                                <label className='modal-label'> Reminder Day of the Month
                                </label>
                                <select 
                                    value={this.state.reminderDay}
                                    name='reminderDay' 
                                    className='modal-entry' 
                                    onChange={this.handleChange}>
                                    {this.dayOptions()}
                                </select>
                            </div>
                        </form>
                    </div>
                    <div>
                        <div className={'modal-buttons'}>
                            <div>
                                <button className='modal-button' onClick={(e) => this.handleSubmit(e)}>Ok</button>
                            </div>
                            <div onClick={handleClose}>
                                <button className='modal-button'>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        )
    }
}

export default Modal