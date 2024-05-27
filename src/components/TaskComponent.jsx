import { React, useState } from 'react';
import '../styles/component.css';
import { FromDateToFinnishFormat, FromFinnishFormatToISO } from '../utils/ParseDates';

export default function TaskComponent(props) {

    const { taskItems } = props || [];
    const [changeCompletion, setChangeCompletion] = useState(null);

    const changeTaskCompletion = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_SCHEDULE_API_URL + "task/" + changeCompletion.taskid, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    taskid: changeCompletion.taskid,
                    name: changeCompletion.name,
                    duedate: changeCompletion.duedate,
                    tasktypeid: changeCompletion.tasktypeid,
                    iscompleted: changeCompletion.iscompleted
                }),
                cache: 'default'
            })

            if (!response.ok) {
                console.log("Tapahtui virhe: " + response.status);
            }

        } catch (error) {
            console.log("Tapahtui virhe 2: " + error);
        }
    };

    const onCheckboxClick = (event, taskid, name, duedate, tasktypeid, iscompleted) => {

        let task = taskItems.filter(x => x.taskid === taskid);
        
        setChangeCompletion(task);
        
        if (changeCompletion) {
            changeTaskCompletion();
        }
    }

    return (
        <>
            <div id="tasksContainer">
                {taskItems.length > 0 ? taskItems.map((item) =>
                    <div key={item.taskid}>{item.name} {FromDateToFinnishFormat(item.duedate)} <input type="checkbox" onChange={(e) => onCheckboxClick(e, item.taskid, item.name, item.duedate, item.tasktypeid, item.iscompleted)} checked={item.iscompleted ? true : false} /> </div>
                ) : <div>Ei tehtäviä päivälle</div>}
            </div>
        </>
    );
}