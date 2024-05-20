import { React, useEffect, useState } from 'react';
import '../styles/component.css';
import '../styles/calendar.css';
import CalendarDays from './CalendarDays';
import { AddOrSubtractDays, GetWeekDays } from '../utils/GetWeekDays';

export default function CalendarComponent(props) {

    const { setDueDate } = props || [];
    const weekDays = ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai", "Sunnuntai"];
    const months = ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Lokakuu", "Marraskuu", "Joulukuu"];
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [lastChosenView, setLastChosenView] = useState(null);

    const handleMonthChange = (operation) => {
        // Change month by adding or removing a month from the date saved from the last shown view
        if (operation === "+") {
            setLastChosenView(new Date(lastChosenView.getFullYear(), lastChosenView.getMonth() + 1, 1));
        }
        else if (operation === "-") {
            setLastChosenView(new Date(lastChosenView.getFullYear(), lastChosenView.getMonth() - 1, 1))
        }
        setSelectedDay(lastChosenView);
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
                        <CalendarDays setDueDate={setDueDate} selectedDay={selectedDay} lastChosenView={lastChosenView} setLastChosenView={setLastChosenView} changeSelectedDay={changeSelectedDay}/>
                    </div>
                </div>
            </div>
        </>
    );
}