import React from "react";
import "./SearchForm.css"

function SearchForm(props) {
    return (
        <form>
            <input onChange={props.handleInputChange} value={props.value} name="search" type="text" className="search-box" placeholder="Information" id="search"></input>
        </form>
    )
}

export default SearchForm;