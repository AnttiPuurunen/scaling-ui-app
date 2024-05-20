import { React, useEffect, useState } from 'react';
import '../styles/component.css';
import CalendarDay from './CalendarDay';
import { AddOrSubtractDays, GetWeekDays } from '../utils/GetWeekDays';

export default function CalendarWeek(props) {

    const { refresh, handleRefresh } = props || [];
    const weekDays = ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai", "Sunnuntai"];
    const [thisWeek, setThisWeek] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);   

    useEffect(() => {
        if (thisWeek.length === 0) getDaysOfTheWeek();
    }, []);

    const getDaysOfTheWeek = (today) => {
        let days;
        setThisWeek([]);

        if (today === null) {
            days = GetWeekDays();
        }
        else {
            days = GetWeekDays(today);
        }
        
        for (let i = 0; i < 7; i++) {
            // Match the weekday and date together
            setThisWeek((thisWeek) =>
                [...thisWeek, { dayOfTheWeek: weekDays[i], dateOfTheDay: days[i] },]);
        }
        // Toggle refresh value to send child component the signal to re-fetch tasks when the week is changed
        handleRefresh();
        console.log(thisWeek);
    }

    const handleBackClick = () => {
        // Get the previous week
        let today;
        if (selectedDay === null) {
            today = new Date();
        }
        else {
            today = selectedDay;
        }

        const days = 7;
        today = AddOrSubtractDays(today, days, "-");
        setSelectedDay(today);
        getDaysOfTheWeek(today);
    }

    const handleForwardClick = () => {
        // Get next week
        let today;
        if (selectedDay === null) {
            today = new Date();
        }
        else {
            today = selectedDay;
        }

        const days = 7;
        today = AddOrSubtractDays(today, days, "+");
        setSelectedDay(today);
        getDaysOfTheWeek(today);
    }

    return (
        <>
            <div id="navigationButtons">
                <button onClick={() => handleBackClick()}>Edellinen</button>
                <button onClick={() => handleForwardClick()}>Seuraava</button>
            </div>
            <div id="calendarWeek">
                {thisWeek.map((item, index) =>
                    <CalendarDay key={index} weekDay={item.dayOfTheWeek} dayDate={item.dateOfTheDay} refresh={refresh} />)}
            </div>
        </>
    );
}