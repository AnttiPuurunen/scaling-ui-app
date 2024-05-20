import { React, useState, useEffect } from 'react';
import '../styles/component.css';
import '../styles/tasktypes.css';
import DropdownMenu from './DropdownMenu';

export default function TaskTypes(props) {

    const { taskType, setTaskType } = props || [];
    const [tasktypes, setTasktypes] = useState([]);

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

    return (
        <>
            <DropdownMenu
                label="Valitse tyyppi"
                options={tasktypes}
                value={taskType}
                setTaskType={setTaskType}
            />
        </>
    );
}