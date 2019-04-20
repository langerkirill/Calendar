import React, { Component } from 'react'
import '../styling/Modal.css'
import { timesArray } from '../../utils/timesArray.js'
import { colorsArray } from '../../utils/colorsArray.js'

class Modal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            reminderTitle: '',
            reminderTime: '',
            color: '',
            id: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.changeColor = this.changeColor.bind(this)
    }

    componentDidMount(){
        if (this.props.selectedReminder) {
            let { reminderTime, reminderTitle, color, id } = this.props.selectedReminder
            reminderTime = reminderTime._i.split(' ')
            reminderTime.shift()
            reminderTime = reminderTime.join(' ')
            this.setState({ reminderTime, reminderTitle, color, id })
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

    changeColor(e) {
        this.setState({
            color: e.target.value
        })
    }

    timeOptions() {
        return timesArray.map((time, i) => <option key={i}>{time}</option>)
    }

    dayOptions() {
        return this.props.daysInMonth.map((day, i) => <option key={i}>{day}</option>)
    }

    colorOptions() {
        return colorsArray.map((color, i) => <option>{color}</option>)
    }

    render() {
        const {
            id,
            style,
            handleClose,
            title
        } = this.props

        return (
            <td className='modal-container' id={id}>
                <div className='modal-class' style={style}>
                    <div className='modal-header'>
                        {title ? <div className='modal-title'>{title}</div> : null}
                    </div>
                    <div className='modal-form-container'>
                        <form className='modal-form'>
                            <div className='modal-input'>
                                <label className='modal-label'> Name
                                </label>
                                <input 
                                    name='reminderTitle' 
                                    maxLength='30' 
                                    onChange={(e) => this.handleChange(e)} 
                                    defaultValue={this.state.reminderTitle}>
                                </input>
                            </div>
                            <div className='modal-input'>
                                <label className='modal-label'> Color
                                </label>
                                <select
                                    value={this.state.color}
                                    onChange={(e) => this.changeColor(e)}
                                    style={{ backgroundColor: this.state.color }}
                                    name='color'>
                                    {this.colorOptions()}
                                </select>
                            </div>
                            <div className='modal-input'>
                                <label className='modal-label'> Time
                                </label>
                                <select 
                                    value={this.state.reminderTime}
                                    name='reminderTime' 
                                    onChange={this.handleChange}>
                                    {this.timeOptions()}
                                </select>
                            </div>
                            <div className='modal-input'>
                                <label className='modal-label'> Day
                                </label>
                                <select 
                                    value={this.state.reminderTime}
                                    name='reminderTime' 
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