import React, { Fragment } from 'react'
import { daysOfWeekArray } from '../../../constants/daysOfWeekArray'

const weekDayNames = () => {
    return (
        <Fragment>
            {daysOfWeekArray.map((day) => <th key={day} className='week-day'>{day}</th>)}
        </Fragment>
    )
}

export default weekDayNames