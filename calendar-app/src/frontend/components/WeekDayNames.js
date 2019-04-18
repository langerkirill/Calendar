import React, { Component, Fragment } from 'react';

export default class WeekDayNames extends Component {
    render() {
        return (
            <Fragment>
                <th className='week-day'>Monday</th>
                <th className='week-day'>Teusday</th>
                <th className='week-day'>Wednesday</th>
                <th className='week-day'>Thursday</th>
                <th className='week-day'>Friday</th>
                <th className='week-day'>Saturday</th>
                <th className='week-day'>Sunday</th>
            </Fragment>
        )
    }
}