import { React, useEffect, useState } from 'react';
import '../styles/component.css';
import CalendarDay from './CalendarDay';
import { GetWeekDays } from '../utils/GetWeekDays';

export default function CalendarWeek(props) {

    const { name } = props || [];
    const weekDays = ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai", "Sunnuntai"];
    const [thisWeek, setThisWeek] = useState([]);
 
    useEffect(() => {
        const getDaysOfTheWeek = () =>{
            let days = GetWeekDays();
            setThisWeek([]);
            for (let i=0; i < 7; i++) {
                // Match the weekday and date together
                setThisWeek((thisWeek) =>
                    [...thisWeek, { dayOfTheWeek : weekDays[i], dateOfTheDay: days[i] }, ]);
            }
            console.log(thisWeek);
        }   

        if (thisWeek.length === 0) getDaysOfTheWeek();
    }, []);

    return (
        <>
            <div id="calendarWeek">
                {thisWeek.map((item, index) =>
                    <CalendarDay key={index} weekDay={item.dayOfTheWeek} dayDate={item.dateOfTheDay} />)}
            </div>
        </>
    );
}