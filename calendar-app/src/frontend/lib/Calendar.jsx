import React, { Component, Fragment } from 'react'
import Month from './Month'
import moment from 'moment'

export default class Calendar extends Component {

    constructor(props){
        super(props)
        this.state = {
            relativeMoment: null,
            monthNumber: 1
        }
        this.changeTheMonth = this.changeTheMonth.bind(this)
    }

    changeTheMonth(direction) {
        const monthNumber = direction === 'forward' 
            ? this.state.monthNumber + 1 
            : this.state.monthNumber - 1
        const relativeMoment = moment().add(monthNumber, 'M')
        debugger
        this.setState({ relativeMoment, monthNumber })
    }

    componentDidMount(){
        const relativeMoment = moment().add(1, 'M')
        this.setState({ relativeMoment })
    }

    render() {
        return (
            <Fragment>
                <button onClick={() => this.changeTheMonth('backward')}>Go Back A Month</button>
                {this.state.relativeMoment ? <Month relativeMoment={this.state.relativeMoment}/> : null}
                <button onClick={() => this.changeTheMonth('forward')}>Add a Month</button>
            </Fragment>
        )
    }
}