import { React, useEffect, useState } from 'react';
import '../styles/calendar.css';
import { FromFinnishFormatToTimestamp } from '../utils/ParseDates';

export default function CalendarDays({ datesToShow, setDatesToShow, highlightedMonth, setHighlightedMonth, setDueDate, selectedDay, lastChosenView, setLastChosenView, changeSelectedDay }) {

    useEffect(() => {
        // Show six full weeks of dates in the calendar
        const fillCalendar = () => {
            let firstDayOfTheMonth;

            if (lastChosenView !== null) {
                firstDayOfTheMonth = new Date(lastChosenView.getFullYear(), lastChosenView.getMonth(), 1);
            }
            else {
                firstDayOfTheMonth = new Date(selectedDay.getFullYear(), selectedDay.getMonth(), 1);
            }
            // Zero-indexed
            const weekdayOfTheFirstDay = firstDayOfTheMonth.getDay();
            let days = [];
            setDatesToShow([]);
            for (let day = 0; day < 42; day++) {
                // Fill the calendar always starting from a Monday
                if (day === 0 && weekdayOfTheFirstDay === 1) {
                    // If the first day of the month is a Monday, go back a week to get last month's last week
                    firstDayOfTheMonth.setDate(firstDayOfTheMonth.getDate() - 7);
                } else if (day === 0 && weekdayOfTheFirstDay === 0) {
                    // If it's a Sunday, go back to that week's Monday
                    firstDayOfTheMonth.setDate(firstDayOfTheMonth.getDate() - 6);
                } else if (day === 0) {
                    // If it's any other day, go back to that week's Monday
                    firstDayOfTheMonth.setDate(firstDayOfTheMonth.getDate() + (day - weekdayOfTheFirstDay + 1));
                } else {
                    firstDayOfTheMonth.setDate(firstDayOfTheMonth.getDate() + 1);
                }

                let calendarDay = {
                    currentMonth: (firstDayOfTheMonth.getMonth() === highlightedMonth.getMonth()),
                    date: (new Date(firstDayOfTheMonth)),
                    month: firstDayOfTheMonth.getMonth(),
                    number: firstDayOfTheMonth.getDate(),
                    selected: (firstDayOfTheMonth.toDateString() === selectedDay.toDateString()),
                    year: firstDayOfTheMonth.getFullYear()
                }
                days.push(calendarDay);
            }
            // Save a date from the middle of the full month being shown, as it will always be the right month to use for navigating 
            setLastChosenView(days[21].date);
            setHighlightedMonth(days[21].date)
            setDatesToShow(days);
        }

        fillCalendar();
    }, [selectedDay]);

    const handleDateSelection = (day) => {
        let date = new Date(day.year, day.month, day.number);
        // Show the selected day in Finnish format without the time
        setDueDate(date.toLocaleDateString("fi-FI").slice(0, 10));
        changeSelectedDay(date);
        setHighlightedMonth(date);
    }

    return (
        <div id="calendar-days">
            {datesToShow.map((day, index) => {
                return <div className={"individual-day" + (day.currentMonth ? " current" : "") + (day.selected ? " selected" : "")} key={index} onClick={() => handleDateSelection(day)}><p>{day.number}</p></div>
            })}
        </div>
    )
};