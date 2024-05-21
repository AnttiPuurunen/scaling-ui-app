import { React, useState, useEffect } from 'react';
import '../styles/component.css';
import '../styles/tasks.css';
import TaskComponent from './TaskComponent';
import { FromFinnishFormatToISO } from '../utils/ParseDates';

export default function CalendarDay(props) {

    const { weekDay, dayDate, refresh } = props || [];
    const [taskItems, setTaskItems] = useState([]);
    
    useEffect(() => {
        const fetchTaskData = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_SCHEDULE_API_URL + "Task/tasksbydate/" + FromFinnishFormatToISO(dayDate));
    
                if (!response.ok) {
                    console.log("Tapahtui virhe: " + response.status);
                }
    
                const data = await response.json();
                setTaskItems(data);
                console.log(data);
            } catch (error) {
                console.log("Tapahtui virhe 2: " + error);
            }
        };

        fetchTaskData();

    }, [refresh]);
    
    return (
        <>
            <div id="calendarDay">
                <p>{weekDay}</p>
                <p>{dayDate}</p>
                <div>
                    <TaskComponent taskItems={taskItems} />
                </div>
            </div>
        </>
    );
}