import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import '../styling/Modal.css'
import { timesArray } from '../../utils/timesArray.js'
import { colorsArray } from '../../utils/colorsArray.js'
import moment from 'moment'

class Modal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            eventTitle: '',
            eventTime: null,
            color: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.changeColor = this.changeColor.bind(this)
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault()
        if (this.state.eventTime === 'Select a Time' 
            || this.state.eventTitle === '' 
            || this.state.eventTime === null) return
        this.props.onSubmit(this.state, this.props.da)
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
                                <label className='modal-label'> Event Name
                                </label>
                                <input name='eventTitle' maxLength='11' onChange={(e) => this.handleChange(e)} defaultValue={this.state.formText}></input>
                            </div>
                            <div className='modal-input'>
                                <label className='modal-label'> Event Color
                                </label>
                                <select
                                    onChange={(e) => this.changeColor(e)}
                                    style={{ backgroundColor: this.state.color }}
                                    name='eventTime'>
                                    {this.colorOptions()}
                                </select>
                            </div>
                            <div className='modal-input'>
                                <label className='modal-label'> Time
                                </label>
                                <select 
                                    name='eventTime' 
                                    onChange={this.handleChange}>
                                    {this.timeOptions()}
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

Modal.propTypes = {
    handleClose: PropTypes.func,
    handleConfirm: PropTypes.func,
    id: PropTypes.string,
    message: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
    children: PropTypes.any,
    style: PropTypes.object,
    title: PropTypes.string,
    buttonText: PropTypes.string,
    buttons: PropTypes.element,
    fullPage: PropTypes.bool,
}

export default Modal