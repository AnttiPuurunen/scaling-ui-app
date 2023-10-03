import React, { useState } from 'react';
import '../styles/content.css';
import '../styles/component.css';

export default function Content() {

    const [name, setName] = useState("")
    const [names, setNames] = useState([]);

    const handleSubmit = () => {
        setNames([...names, name]);
    }

    return (
        <>
            <div id="mainContentAdd">
                <input type="text" onChange={(e) => setName(e.target.value)} />
                <button type="button" onClick={() => handleSubmit()}>Lisää</button>
            </div>
            <div id="content">
                {names.map((name) =>
                    <p id="mainComponent" key={name}>{name}</p>)}
            </div>
        </>
    );
}