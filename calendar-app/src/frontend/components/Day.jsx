import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { addEvent } from '../../actions/eventActions'
import { throws } from 'assert';

class Day extends Component {

    constructor(props){
        super(props)
    }

    componentDidUpdate(prevProps){
        if (this.props.events != prevProps.events) {
            debugger
        }
    }

    render() {
        return(
            <td onClick={this.props.onClick} className='week-row'>
                <div className='day-number 1'>{this.props.dayNumber}</div>
            </td>
        )
    }
}


const mapStateToProps = state => {
    let events = Object.values(state.eventState)

    return {
        events
    }
}

export default connect(mapStateToProps)(Day);