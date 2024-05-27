import { React, useState, useEffect } from 'react';
import '../styles/component.css';
import '../styles/tasks.css';
import TaskTypes from './TaskTypes';
import CalendarComponent from './CalendarComponent';
import { FromFinnishFormatToISO } from '../utils/ParseDates';

export default function AddTask(props) {

    const { handleRefresh } = props || [];
    const [name, setName] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [taskType, setTaskType] = useState(0);
    const [showCalendar, setShowCalendar] = useState(false);

    const addNewTask = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_SCHEDULE_API_URL + "task", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    duedate: FromFinnishFormatToISO(dueDate),
                    tasktypeid: taskType,
                    iscompleted: 0
                }),
                cache: 'default'
            })

            if (!response.ok) {
                console.log("Tapahtui virhe: " + response.status);
            }

            const data = await response.json();
            handleRefresh();
        } catch (error) {
            console.log("Tapahtui virhe 2: " + error);
        }
    };

    const handleSubmitClick = () => {
        if (name !== "" & taskType !== 0 & dueDate !== "") {
            addNewTask();   
        }
    }

    return (
        <>
            <div id="addTask">
                <label>
                    Nimi:
                    <input type="text" onChange={(e) => setName(e.target.value)} />
                </label>
                <TaskTypes taskType={taskType} setTaskType={setTaskType}/>
                <label>
                    Tehtävä viimeistään:
                    <input type="text" onClick={() => setShowCalendar(!showCalendar)} defaultValue={dueDate} />
                </label>
                {showCalendar ? <CalendarComponent dueDate={dueDate} showCalendar={showCalendar} setDueDate={setDueDate}/> : null}
                <button type="button" disabled={!name | !dueDate | !taskType} onClick={() => handleSubmitClick()}>Lisää</button>
            </div>
        </>
    );
}