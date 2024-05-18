import React from 'react';
import '../styles/component.css';

export default function CalendarDay(props) {

    const { weekDay, dayDate } = props || [];

    return (
        <>
            <div id="calendarDay">
                <p>{weekDay}</p>
                <p>{dayDate}</p>
            </div>
        </>
    );
}