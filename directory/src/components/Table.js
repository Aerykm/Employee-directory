import React from "react";
import "./Table.css"

function Table(props) {
    return (
        <tr className="table-row">
            <td>
                <img alt={props.alt} className="img-fluid" src={props.src} />
            </td>
            <td>{props.name}</td>
            <td>{props.phone}</td>
            <td>{props.email}</td>
            <td>{props.dob}</td>
        </tr>
    )
}

export default Table;