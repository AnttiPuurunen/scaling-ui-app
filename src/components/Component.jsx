import React from 'react';
import '../styles/component.css';

export default function Component(props) {

    const { name } = props || [];

    return (
        <>
            <div id="mainComponent">
                {name}
            </div>
        </>
    );
}