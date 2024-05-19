import { React, useState, useEffect } from 'react';
import '../styles/component.css';
import '../styles/tasks.css';
import TaskComponent from './TaskComponent';
import Tasktypes from './TaskTypes';
import { FromFinnishFormatToISO, FromFinnishFormatToTimestamp } from '../utils/ParseDates';

export default function AddTask(props) {

    const { weekDay, dayDate } = props || [];
    const [taskItems, setTaskItems] = useState([]);
    const [newTask, setNewTask] = useState(null);
    const [name, setName] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [taskType, setTaskType] = useState(0);

    const addNewTask = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_SCHEDULE_API_URL + "task", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    duedate: dueDate,
                    tasktypeid: taskType,
                    iscompleted: 0
                }),
                cache: 'default'
            })

            if (!response.ok) {
                console.log("Tapahtui virhe: " + response.status);
            }

            const data = await response.json();
            
            console.log(data);
        } catch (error) {
            console.log("Tapahtui virhe 2: " + error);
        }
    };

    const handleSubmitClick = () => {
        if (name !== "" | taskType !== 0 | dueDate !== "") {
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
                <label>
                    Tyyppi:
                    <input type="text" onChange={(e) => setTaskType(e.target.value)} />
                </label>
                <Tasktypes />
                <label>
                    Tehtävä viimeistään:
                    <input type="text" onChange={(e) => setDueDate(e.target.value)} />
                </label>
                <button type="button" onClick={() => handleSubmitClick()}>Lisää</button>
            </div>
        </>
    );
}