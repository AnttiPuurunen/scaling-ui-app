import React, { useState } from 'react';
import '../styles/content.css';
import '../styles/component.css';

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
                <input type="text" onChange={(e) => setName(e.target.value)} />
                <button type="button" onClick={() => handleSubmit()}>Hae tehtävät</button>
            </div>
            <div id="content">
                {taskItems.map((item) =>
                    <p id="mainComponent" key={item.taskid}>{item.name}</p>)}
            </div>
        </>
    );
}