import React, { useState } from 'react';
import '../styles/content.css';
import '../styles/component.css';
import CalendarWeek from './CalendarWeek';
import AddTask from './AddTask';

export default function Content() {

    const [name, setName] = useState("")
    const [taskItems, setTaskItems] = useState([]);

    const fetchTaskData = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_SCHEDULE_API_URL + "Task");

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

    const handleSubmit = () => {
        fetchTaskData();
    }

    return (
        <>
            <div id="mainContentAdd">
                <AddTask />
            </div>
            <div id="content">
                {taskItems.map((item) =>
                    <p id="mainComponent" key={item.taskid}>{item.name}</p>)}
            </div>
            <div>
                <CalendarWeek taskItems={taskItems}/>
            </div>
        </>
    );
}