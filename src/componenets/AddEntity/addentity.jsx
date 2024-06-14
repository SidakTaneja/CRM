import React, { useRef, useState, useEffect } from "react";
import Select from "react-select";
import "./addentity.css";
import { updatetable, getTable } from "../data";
import Home from "../Home/home.jsx"
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import SidePanel from "../SidePanel/SidePanel.js";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import styled from '@emotion/styled';
import {
    Box,
    Container,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    InputBase,
    Button
} from '@mui/material';

function AddEntity() {
    const [type, setType] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [entityName, setEntityName] = useState("");
    const [labelsingular, setLabelsingular] = useState("");
    const [labelplural, setLabelplural] = useState("");
    const [screen, setScreen] = useState("");
    const [sidePanelCollapsed, setSidePanelCollapsed] = useState(false);
    const sidePanelRef = useRef(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);

    const columns = [
        { id: 'name', label: 'Name', minWidth: 150 },
        { id: 'label', label: 'Label', minWidth: 150 },
        { id: 'type', label: 'Type', minWidth: 150 },
        { id: 'module', label: 'Module', minWidth: 150 },
    ];

    function createData(name, label, type, module) {
        return { name, label, type, module };
    }

    const rows = [
        createData('Account', 'Account', 'Entity', 'Sales'),
        createData('BpmnProcess', 'Process', 'Workflow', 'Advanced'),
        createData('BpmnUserTask', 'Process User Task', 'Task', 'Advanced'),
        createData('BpmnUserTask', 'Process User Task', 'Task', 'Advanced'),
        createData('Account', 'Account', 'Entity', 'Sales'),
        createData('BpmnProcess', 'Process', 'Workflow', 'Advanced'),
        createData('BpmnUserTask', 'Process User Task', 'Task', 'Advanced'),
    ];

    const StyledTableCell = styled(TableCell)({
        color: '#613FAA',
        '&:hover': {
            textDecoration: 'underline',
            color: '#1565C0',
        }
    });

    const FixedHeaderTable = styled(Table)({
        '& thead': {
            position: 'sticky',
            top: 0,
            backgroundColor: '#f4f4f4',
            zIndex: 1,
        },
    });

    const SearchContainer = styled(Box)({
        display: 'flex',
        alignItems: 'center',
        color: "#999999",

    });

    const SearchInput = styled(InputBase)({
        borderRadius: '50px',
        marginRight: '10px',
        backgroundColor: '#f4f4f4',
        padding: '5px 10px',
        border: '1px solid #CCCCCC',
        color: "#999999",
        width: "100%"

    });

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
                                defaultValue=""
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
                <div style={{ marginTop: "2rem" }}>
                    <text className="heading">
                        Entity Fields
                    </text>
                </div>
                <div className="button-container-2">
                    <button className="underlined-btn">Fields</button>
                    <button className="underlined-btn-not-selected">Relationships</button>
                    <button className="underlined-btn-not-selected">Formula</button>
                    <Box display="flex" justifyContent={"flex-end"} width={sidePanelCollapsed ? "78.2%" : "74%"} >
                        <SearchContainer>
                            <SearchInput placeholder="Search" endAdornment={<SearchIcon />} />
                        </SearchContainer>
                        <button className="cancel" style={{
                            fontSize: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            paddingLeft: '16px'
                        }}>
                            <AddIcon />
                            Add Field
                        </button>
                    </Box>
                </div>
                <Paper sx={{ width: '98%', marginTop: '1rem' }}>
                    <TableContainer >
                        <FixedHeaderTable>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead >
                                    <TableRow>
                                        {columns.map((column) => (
                                            <StyledTableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                                {column.label}
                                            </StyledTableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </FixedHeaderTable>
                    </TableContainer>
                </Paper>
            </div >
        </>
    );
}

export default AddEntity;
