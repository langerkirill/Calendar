import React, { Fragment } from 'react'
import { daysOfWeekArray } from '../../constants/daysOfWeekArray'

export const weekDayNames = () => {
    return (
        <Fragment>
            {daysOfWeekArray.map((day, i) => <th key={i} className='week-day'>{day}</th>)}
        </Fragment>
    )
}