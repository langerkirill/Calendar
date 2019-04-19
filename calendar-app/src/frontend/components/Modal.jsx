import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import '../styling/Modal.css'

const renderBody = ({ message, children }) => {
    return message ?
        <div dangerouslySetInnerHTML={{ __html: message }} />
        :
        children;
};

const Modal = (props) => {

    const {
        id,
        style,
        handleClose,
        handleConfirm,
        title,
    } = props

    return (
        <div className='modal-container' id={id}>
            <div className='modal-class' style={style}>
                <div className='modal-header'>
                    {title ? <div className='modal-title'>{title}</div> : null}
                </div>
                <div className='modal-body'>
                    {renderBody(props)}
                </div>
                <div className='modal-form-container'>
                    <form>
                        <label> Event Name
                            <input></input>
                        </label>
                        <br></br>
                        <label> Time
                            <select></select>
                        </label>
                    </form>
                </div>
                <div>
                    <div className={'modal-buttons'}>
                        <div>
                            <button className='modal-button' onClick={handleConfirm}>Ok</button>
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

Modal.defaultProps = {
    buttonText: 'OK'
};

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