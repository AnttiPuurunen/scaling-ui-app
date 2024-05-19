import { React, useState, useEffect } from 'react';
import '../styles/component.css';
import '../styles/tasktypes.css';
import TaskComponent from './TaskComponent';
import { FromFinnishFormatToISO, FromFinnishFormatToTimestamp } from '../utils/ParseDates';
import DropdownMenu from './DropdownMenu';

export default function Tasktypes(props) {

    const { weekDay, dayDate } = props || [];
    const [tasktypes, setTasktypes] = useState([]);
    const [newTask, setNewTask] = useState(null);
    const [name, setName] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [taskType, setTaskType] = useState(0);
    const [showDropdown, setShowdropDown] = useState(false);

    useEffect(() => {
        const fetchTasktypeData = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_SCHEDULE_API_URL + "tasktype");

                if (!response.ok) {
                    console.log("Tapahtui virhe: " + response.status);
                }

                const data = await response.json();
                setTasktypes(data);
                console.log(data);
            } catch (error) {
                console.log("Tapahtui virhe 2: " + error);
            }
        };

        fetchTasktypeData();

    }, []);

    const handleDropdownClick = () => {
        setShowdropDown(!showDropdown);
    }

    return (
        <>
            <DropdownMenu open={showDropdown}
                trigger={<button onClick={handleDropdownClick}>Valitse tyyppi</button>}
                items={tasktypes}
            />
        </>
    );
}