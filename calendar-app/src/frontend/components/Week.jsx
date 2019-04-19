import React, { Component, Fragment } from 'react'
import '../styling/week.css'
import Modal from './Modal'

class Week extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            dayNumber: null
        }
    }

    handleClick(dayNumber){
        this.setState({modal: true, dayNumber})
    }
    
    // {this.state.modal ? <Modal handleClose={() => this.setState({modal: false})} date={this.state.dayNumber}/> : null}

    render(){
        return (
            <Fragment>
                {this.state.modal ? <Modal 
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

export default Week;