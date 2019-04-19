import React, { Component, Fragment } from 'react'
import '../styling/week.css'
import Modal from './Modal'
import { connect } from 'react-redux'
import { addEvent } from '../../actions/eventActions'
import moment from 'moment'

class Week extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            dayNumber: null
        }
        this.handleSumbit = this.handleSumbit.bind(this)
    }

    handleClick(dayNumber){
        this.setState({modal: true, dayNumber})
    }

    formatTime(event){
        const year = moment().year()
        let month =  moment().month()
        if (month.length === 1) month = "0" + month
        const day = this.state.dayNumber
        const eventTime = moment(`${year}-${month}-${day} ${event.eventTime}`, "YYYY-MM-DD HH:mm A")
        event['eventTime'] = eventTime
        return event
    }

    handleSumbit(event) {
        this.formatTime(event)
        this.props.addEvent(event)
    }
    
    render(){
        return (
            <Fragment>
                {this.state.modal ? <Modal 
                    onSubmit={this.handleSumbit}
                    title={`Schedule your event for the selected day (${this.state.dayNumber}) below:`}
                    handleClose={() => this.setState({modal: false})} /> : null}
                <td onClick={() => this.handleClick(this.props.dayNumbers[0])} className='week-row 1'>
                    <div className='day-number'>{this.props.dayNumbers[0]}</div>
                </td>
                <td onClick={() => this.handleClick(this.props.dayNumbers[1])} className='week-row 2'>
                    <div className='day-number'>{this.props.dayNumbers[1]}</div>
                </td>
                <td onClick={() => this.handleClick(this.props.dayNumbers[2])} className='week-row 3'>
                    <div className='day-number'>{this.props.dayNumbers[2]}</div>
                </td>
                <td onClick={() => this.handleClick(this.props.dayNumbers[3])} className='week-row 4'>
                    <div className='day-number'>{this.props.dayNumbers[3]}</div>
                </td>
                <td onClick={() => this.handleClick(this.props.dayNumbers[4])} className='week-row 5'>
                    <div className='day-number'>{this.props.dayNumbers[4]}</div>
                </td>
                <td onClick={() => this.handleClick(this.props.dayNumbers[5])} className='week-row 6'>
                    <div className='day-number'>{this.props.dayNumbers[5]}</div>
                </td>
                <td onClick={() => this.handleClick(this.props.dayNumbers[6])} className='week-row 7'>
                    <div className='day-number'>{this.props.dayNumbers[6]}</div>
                </td>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {

    debugger

    return {
        state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addEvent: (event) => dispatch(addEvent(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Week);