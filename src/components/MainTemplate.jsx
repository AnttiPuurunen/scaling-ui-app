import React from 'react';
import { Outlet } from "react-router-dom";
import '../styles/main.css';

export default function MainTemplate() {
    return (
        <>
            <div id="mainDiv">
                <div id="header">
                    <h1>Tervetulloo!</h1>
                </div>

                <div id="main">
                    <Outlet />
                </div>

                <div id="footer">

                </div>
            </div>
        </>
    );
}