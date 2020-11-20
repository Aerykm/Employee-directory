import React from "react";
import "./Header.css";

function Header(props) {
    return (
        <header className="header">
            <h1>{props.heading}</h1>
            <p>{props.instructions}</p>
        </header>
    );
}

export default Header;