import React, { useRef, useState, useEffect } from "react";
import Select from "react-select";
import "./addentity.css";
import { updatetable, getTable } from "../data";
import Home from "../Home/home.jsx"
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import SidePanel from "../SidePanel/SidePanel.js";

function AddEntity() {
    const [type, setType] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [entityName, setEntityName] = useState("");
    const [labelsingular, setLabelsingular] = useState("");
    const [labelplural, setLabelplural] = useState("");
    const [screen, setScreen] = useState("");
    const [sidePanelCollapsed, setSidePanelCollapsed] = useState(false);
    const sidePanelRef = useRef(null);

    const handleClickOutside = (event) => {
        if (sidePanelRef.current && !sidePanelRef.current.contains(event.target)) {
            setSidePanelCollapsed(true);
        }
    };

    const handleClickOnPanel = () => {
        setSidePanelCollapsed(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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

    // function create() {
    //     if (!entityName || !selectedType) {
    //         alert("Please fill in all fields.");
    //         return;
    //     }
    //     updatetable(entityName, labelsingular, type)
    //     setScreen("Home")
    // }

    // function cancel() {
    //     setScreen("Home")
    // }

    if (screen === "Home") {
        return <Home />
    }

    return (
        <>
            <div ref={sidePanelRef} onClick={handleClickOnPanel}>
                <SidePanel collapsed={sidePanelCollapsed} />
            </div>
            <div className={`container ${sidePanelCollapsed ? "collapsed" : ""}`}>
                <text className="heading">Create New Entity</text>
                <div className="box">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Name"
                                defaultValue="Placeholder"
                                style={{ width: '32%' }}
                                value={entityName}
                                onChange={handleEntityNameChange}
                                onBlur={handleEntityNameBlur}
                            />

                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Select"
                                defaultValue="EUR"
                                style={{ width: '32%', marginLeft: '2rem' }}
                                onChange={handleTypeSelect}
                            >
                                {typeOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                required
                                id="outlined-required"
                                label="Singular Label"
                                defaultValue=""
                                value={labelsingular}
                                onChange={handleLabelsingularchange}
                                style={{ width: '32%', marginLeft: '2rem' }}
                            />

                            <TextField
                                required
                                id="outlined-required"
                                label="Plural Label"
                                defaultValue=""
                                value={labelplural}
                                onChange={handleLabelpluralchange}
                                style={{ marginLeft: '2rem', width: '32%' }}
                            />
                        </div>
                        {/* <div style={{ display: "flex", flexDirection: "row", marginTop: '2rem' }}>
                            <TextField
                            required
                            id="outlined-required"
                            label="Singular Label"
                            defaultValue=""
                            value={labelsingular}
                            onChange={handleLabelsingularchange}
                            style={{ width: '32%' }}
                            />
                            
                            <TextField
                            required
                            id="outlined-required"
                            label="Plural Label"
                            defaultValue=""
                            value={labelplural}
                            onChange={handleLabelpluralchange}
                            style={{ marginLeft: '2rem', width: '32%' }}
                            />
                            </div> */}
                        <div className="button-container">
                            <button className="cancel">
                                CANCEL
                            </button>
                            <button className="create">
                                SAVE
                            </button>
                        </div>
                    </div>
                </div>
                <div className="container-2">
                    <text className="heading">
                        Entity Fields
                    </text>
                    {/* <div className="button-container-2">
                        <button className="cancel">
                            CANCEL
                        </button>
                        <button className="create">
                            SAVE
                        </button>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default AddEntity;
