import React, { useState } from "react";
import Select from "react-select";
import "./addentity.css";
import { updatetable, getTable } from "../data";
import Home from "../Home/home.jsx"

function AddEntity() {
    const [type, setType] = useState("")
    const [selectedType, setSelectedType] = useState("");
    const [entityName, setEntityName] = useState("");
    const [labelsingular, setLabelsingular] = useState("");
    const [labelplural, setLabelplural] = useState("");
    const [screen, setScreen] = useState("")

    const typeOptions = [
        { value: "base", label: "Base" },
        { value: "baseplus", label: "Base Plus" },
        { value: "event", label: "Event" },
        { value: "person", label: "Person" },
        { value: "company", label: "Company" }
    ];

    function handleTypeSelect(option) {
        setSelectedType(option);
        setType(option.label)
    }

    function handleEntityNameChange(event) {
        setEntityName(capitalizeFirstLetter(event.target.value));
    }

    function handleEntityNameBlur() {
        if (entityName) {
            const capitalizedEntityName = capitalizeFirstLetter(entityName);
            setLabelsingular(capitalizedEntityName);
            setLabelplural(capitalizedEntityName + "s");
        }
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function handleLabelsingularchange(event) {
        setLabelsingular(event.target.value)
    }

    function handleLabelpluralchange(event) {
        setLabelplural(event.target.value)
    }

    function create() {
        if (!entityName || !selectedType) {
            alert("Please fill in all fields.");
            return;
        }
        updatetable(entityName, labelsingular, type)
        setScreen("Home")
    }

    function cancel() {
        setScreen("Home")
    }

    if (screen === "Home") {
        return <Home />
    }


    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: 'white',
            borderColor: state.isFocused ? '#6e8efb' : 'gray',
            boxShadow: state.isFocused ? '0 0 0 3px rgba(110, 142, 251, 0.2)' : 'none',
            '&:hover': {
                borderColor: state.isFocused ? '#6e8efb' : 'darkgray'
            },
            width: '14rem'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'lightgray' : 'white',
            color: 'black',
            '&:hover': {
                backgroundColor: 'lightgray'
            }
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: 'gray',
            '&:hover': {
                color: 'darkgray'
            }
        }),
        indicatorSeparator: () => ({
            display: 'none'
        }),
        valueContainer: (provided) => ({
            ...provided,
            height: '40px',
            padding: '0 8px'
        }),
        input: (provided) => ({
            ...provided,
            margin: '0',
            padding: '0'
        })
    };

    return (
        <div >
            <button className="create" onClick={create}>
                Create
            </button>
            <button className="cancel" onClick={cancel}>
                Cancel
            </button>
            <div className="box">
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ display: "flex", flexDirection: "column", marginRight: '1rem' }}>
                        <span className="heading">
                            Entity Name
                        </span>
                        <input
                            type="text"
                            className="entity-input"
                            value={entityName}
                            onChange={handleEntityNameChange}
                            onBlur={handleEntityNameBlur}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", marginRight: '1rem' }}>
                        <div className="dropdown">
                            <span className="heading">
                                Type
                            </span>
                            <div style={{ marginTop: "0.5rem", width: "15rem" }}>
                                <Select
                                    options={typeOptions}
                                    placeholder=""
                                    isSearchable={false}
                                    value={selectedType}
                                    onChange={handleTypeSelect}
                                    styles={customStyles}
                                    classNamePrefix="custom-select"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", marginTop: "1rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", marginRight: '1rem' }}>
                        <span className="heading">
                            Label Singular
                        </span>
                        <input
                            type="text"
                            className="entity-input"
                            value={labelsingular}
                            onChange={handleLabelsingularchange}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", marginRight: '1rem' }}>
                        <div className="dropdown">
                            <span className="heading">
                                Label Plural
                            </span>
                            <input
                                type="text"
                                className="entity-input"
                                value={labelplural}
                                onChange={handleLabelpluralchange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEntity;
