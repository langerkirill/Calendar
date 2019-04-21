import React, { Component } from 'react'
import ModalForm from './ModalForm'
import { SELECT_TIME } from '../../constants/appStrings'
import '../styling/Modal.css'

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
        const { reminderTime, reminderTitle } = this.state
        if (reminderTime === SELECT_TIME 
            || reminderTitle === '' 
            || reminderTime === null) return
        this.props.onSubmit(this.state)
        this.props.handleClose()
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
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit} 
                            {...this.state} 
                            {...this.props}/>
                    </div>
                    <div>
                        <div className={'modal-buttons'}>
                            <div>
                                <button className='modal-button' onClick={(e) => this.handleSubmit(e)}>{firstWord}</button>
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