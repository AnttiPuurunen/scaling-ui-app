import React from 'react';
import '../styles/component.css';
import { FromDateToFinnishFormat } from '../utils/ParseDates';

export default function TaskComponent(props) {

    const { taskItems } = props || [];


    return (
        <>
            <div id="tasksContainer">
                {taskItems.length > 0 ? taskItems.map((item) => 
                    <div key={item.taskid}>{item.name} {FromDateToFinnishFormat(item.duedate)} <input type="checkbox" /> </div>
                ) : <div>Ei tehtäviä päivälle</div>}
            </div>
        </>
    );
}