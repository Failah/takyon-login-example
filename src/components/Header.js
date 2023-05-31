import React from "react";

import logo from '../img/takyon-icon.ico';

export default function Header() {
    return (
        <header>
            <div className="container">
                <img className="icon" src={logo} alt="Logo"></img>
            </div>
        </header>
    )
}