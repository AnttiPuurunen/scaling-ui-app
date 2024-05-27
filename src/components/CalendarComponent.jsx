import { React, useEffect, useState } from 'react';
import '../styles/component.css';
import '../styles/calendar.css';
import CalendarDays from './CalendarDays';
import { FromFinnishFormatToTimestamp } from '../utils/ParseDates';

export default function CalendarComponent(props) {

    const { dueDate, setDueDate, showCalendar } = props || [];
    const weekDays = ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai", "Sunnuntai"];
    const months = ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"];
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [lastChosenView, setLastChosenView] = useState(null);
    const [datesToShow, setDatesToShow] = useState([]);
    const [firstDayOfShownCalendarView, setFirstDayOfShownCalendarView] = useState(null);
    const [highlightedMonth, setHighlightedMonth] = useState(new Date());

    useEffect(() => {
        if (showCalendar & dueDate & dueDate !== "") {
            setSelectedDay(new Date(FromFinnishFormatToTimestamp(dueDate)));
            console.log("In if-clause");    
        }
        console.log("Triggering dueDate setting...");
    }, [showCalendar]);

    const handleMonthChange = (operation) => {
        // Change month by adding or removing a month from the date saved from the last shown view
        if (operation === "+") {
            setLastChosenView(new Date(lastChosenView.getFullYear(), lastChosenView.getMonth() + 1, 1));
        }
        else if (operation === "-") {
            setLastChosenView(new Date(lastChosenView.getFullYear(), lastChosenView.getMonth() - 1, 1))
        }
        changeSelectedDay(new Date(lastChosenView.getFullYear(), lastChosenView.getMonth(),));
        setHighlightedMonth(lastChosenView);
        /*
        for (let day = 0; day < datesToShow.length; day++) {
            setDatesToShow(...datesToShow, datesToShow[day].currentMonth === lastChosenView.getMonth());
        }*/
    }

    const changeSelectedDay = (date) => {
        setSelectedDay(date);
    }

    return (
        <>
            <div id="calendar">
                <div id="calendar-header">  
                    <h3>
                        {months[selectedDay.getMonth()]} {selectedDay.getFullYear()}
                    </h3>
                </div>
                <div id="back-next-buttons">
                <button onClick={() => handleMonthChange("-")}>Edellinen</button>
                <button onClick={() => handleMonthChange("+")}>Seuraava</button>
            </div>
                <div id="calendar-body">
                    <div id="weekdays-table">
                        {weekDays.map((day, index) => {
                            return <div key={index}>{day}</div>
                        })}
                    </div>
                    <div id="calendar-content">
                        <CalendarDays datesToShow={datesToShow} setDatesToShow={setDatesToShow} highlightedMonth={highlightedMonth} setHighlightedMonth={setHighlightedMonth} firstDayOfShownCalendarView={firstDayOfShownCalendarView} setFirstDayOfShownCalendarView={setFirstDayOfShownCalendarView} dueDate={dueDate} setDueDate={setDueDate} selectedDay={selectedDay} lastChosenView={lastChosenView} setLastChosenView={setLastChosenView} changeSelectedDay={changeSelectedDay}/>
                    </div>
                </div>
            </div>
        </>
    );
}