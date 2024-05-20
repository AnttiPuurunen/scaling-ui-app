import React, { useState } from 'react';
import '../styles/content.css';
import '../styles/component.css';
import CalendarWeek from './CalendarWeek';
import AddTask from './AddTask';

export default function Content() {

    const [name, setName] = useState("")
    const [taskItems, setTaskItems] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => {
        setRefresh(!refresh);
    }

    return (
        <>
            <div id="mainContentAdd">
                <AddTask handleRefresh={handleRefresh}/>
            </div>
            <div id="content">
                {taskItems.map((item) =>
                    <p id="mainComponent" key={item.taskid}>{item.name}</p>)}
            </div>
            <div>
                <CalendarWeek refresh={refresh} handleRefresh={handleRefresh} />
            </div>
        </>
    );
}