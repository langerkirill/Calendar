import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import '../styling/Modal.css'
import { timesArray } from '../../utils/timesArray.js'

class Modal extends Component {

    constructor(props){
        super(props)
        this.state = {
            formText: '',
            formTime: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const formText = e.target.value
        this.setState({ formText })
    }

    handleSubmit(e) {
        e.preventDefault()
        debugger
    }

    timeOptions() {
        return timesArray.map((time, i) => <option key={i}>{time}</option>)
    }

    render() {
        const {
            id,
            style,
            handleClose,
            handleConfirm,
            title,
        } = this.props

        return (
            <div className='modal-container' id={id}>
                <div className='modal-class' style={style}>
                    <div className='modal-header'>
                        {title ? <div className='modal-title'>{title}</div> : null}
                    </div>
                    <div className='modal-form-container'>
                        <form >
                            <label> Event Name
                                <input onChange={(e) => this.handleChange(e)} defaultValue={this.state.formText}></input>
                            </label>
                            <br></br>
                            <label> Time
                                <select>
                                    {this.timeOptions()}
                                </select>
                            </label>
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
            </div>
        );
    };
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
};

export default Modal;