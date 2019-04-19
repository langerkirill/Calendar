import React, { Component, Fragment } from 'react';
import '../../styling/week.css'

export default class Week extends Component {

    render(){
        return (
            <Fragment>
                <td className='week-row 1'>
                    <div className='day-number'>{this.props.dayNumbers[0]}</div>
                </td>
                <td className='week-row 2'>
                    <div className='day-number'>{this.props.dayNumbers[1]}</div>
                </td>
                <td className='week-row 3'>
                    <div className='day-number'>{this.props.dayNumbers[2]}</div>
                </td>
                <td className='week-row 4'>
                    <div className='day-number'>{this.props.dayNumbers[3]}</div>
                </td>
                <td className='week-row 5'>
                    <div className='day-number'>{this.props.dayNumbers[4]}</div>
                </td>
                <td className='week-row 6'>
                    <div className='day-number'>{this.props.dayNumbers[5]}</div>
                </td>
                <td className='week-row 7'>
                    <div className='day-number'>{this.props.dayNumbers[6]}</div>
                </td>
            </Fragment>
        )
    }
}