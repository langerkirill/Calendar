/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react'
import ModalForm from './ModalForm'
import { SELECT_TIME } from '../../../constants/appStrings'
import '../../styling/Modal.css'

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
        const { selectedReminder } = this.props
        if (selectedReminder) {
            const { reminderTitle, reminderDay, color, id } = selectedReminder
            let reminderTime = selectedReminder.reminderTime._i.split(' ')
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
        const { reminderTime, reminderTitle } = this.state
        const { onSubmit, handleClose } = this.props
        if (reminderTime === SELECT_TIME 
            || reminderTime === ''
            || reminderTitle === '' 
            || reminderTime === null) return
        onSubmit(this.state)
        handleClose()
    }

    render() {
        const { handleClose, title, firstWord } = this.props
        return (
            <td className='modal-container' >
                <div className='modal-class' >
                    <div className='modal-header'>
                        {title ? <div className='modal-title'>{title}</div> : null}
                    </div>
                    <div className='modal-form-container'>
                        <ModalForm 
                            {...this.state}
                            {...this.props}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit} />
                    </div>
                    <div>
                        <div className='modal-buttons'>
                            <div>
                                <button 
                                    type='submit'
                                    id='submit' 
                                    className='modal-button' 
                                    onClick={(e) => this.handleSubmit(e)}>{firstWord}</button>
                            </div>
                            <div >
                                <button 
                                    type='button'
                                    id='close' 
                                    className='modal-button'
                                    onClick={handleClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        )
    }
}

export default Modal