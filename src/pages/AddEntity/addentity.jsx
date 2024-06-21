import React, { useRef, useState, useEffect } from "react";
import Select from "react-select";
import "./addentity.css";
import Home from "../Home/home.jsx";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import SidePanel from '../../componenets/SidePanel/SidePanel';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import styled from '@emotion/styled';
import {
    IconButton,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
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
import { getDefaultfields, createEntity, getfields } from "../../hooks/API/api.jsx";

function AddEntity() {
    const [type, setType] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedfieldType, setSelectedFieldType] = useState("");
    const [entityName, setEntityName] = useState("");
    const [labelsingular, setLabelsingular] = useState("");
    const [labelplural, setLabelplural] = useState("");
    const [screen, setScreen] = useState("");
    const [sidePanelCollapsed, setSidePanelCollapsed] = useState(true);
    const sidePanelRef = useRef(null);
    const [fieldName, setFieldName] = useState("");
    const [fieldLabel, setFieldLabel] = useState("");
    const [fieldDefault, setFieldDefault] = useState("");
    const [fieldType, setFieldType] = useState("");
    const [fieldChar, setFieldChar] = useState("");
    const [fieldTooltipText, setFieldTooltipText] = useState("");
    const [fields, setFields] = useState()
    const [entityCreated, setEntityCreated] = useState(false);
    const [entityID, setEntityID] = useState()
    const [entityFields, setEntityFields] = useState()
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (type) {
                    const result = await getDefaultfields(type);
                    setFields(result.fields)
                    // console.log(result.fields);
                }
            } catch (error) {
                console.error('Error fetching entity:', error);
            }
        };
        fetchData();
    }, [type]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (entityID) {
                    const result = await getfields(entityID)
                    console.log(result)
                    const transformedData = result.map(field => ({
                        name: capitalizeFirstLetter(String(field.name)),
                        label: (field.label),
                        type: capitalizeFirstLetter(String(field.type)),
                        required: (String(field.required))
                    }))
                    setRows(transformedData)
                }
            } catch (error) {
                console.error('Error fetching entity:', error);
            }
        };
        fetchData();
    }, [entityID]);


    const columns = [
        { id: 'name', label: 'Name', minWidth: 150 },
        { id: 'label', label: 'Label', minWidth: 150 },
        { id: 'type', label: 'Type', minWidth: 150 },
        { id: 'required', label: 'Required', minWidth: 150 },
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
        { value: 1, label: "Base" },
        // { value: "baseplus", label: "Base Plus" },
        // { value: "event", label: "Event" },
        { value: 2, label: "Person" },
        // { value: "company", label: "Company" }
    ];

    const AdministrationText = styled(Button)({
        color: '#1565C0',
        '&:hover': {
            textDecoration: 'underline',
            color: '#1565C0',
        },
    });

    const RightContainer = styled.div(({ sidePanelCollapsed }) => ({
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: '1',
        position: 'absolute',
        right: 0,
        top: 0,
        width: '40%',
    }));

    const LeftContainer = styled.div(({ sidePanelCollapsed }) => ({
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 'fit',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '2px solid #ececec',
        margin: '5px',
        marginLeft: '1.8%',
    }));

    const AccountIcon = styled(AccountCircleIcon)({
        color: '#613FAA',
        fontSize: '36px',
    });

    const MoreIcon = styled(MoreVertIcon)({
        color: '#613FAA',
        fontSize: '36px',
    });


    const handleTypeSelect = (event) => {
        const selectedValue = event.target.value;
        setType(selectedValue);
        // console.log(selectedValue)
        switch (selectedValue) {
            case 1:
                setSelectedType("Base")
                break;
            case 2:
                setSelectedType("Person")
                break;
            default:
                console.log("Unknown type");
        }
    };

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

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    function handleLabelsingularchange(event) {
        setLabelsingular(event.target.value)
    }

    function handleLabelpluralchange(event) {
        setLabelplural(event.target.value)
    }

    function handleFieldNameChange(event) {
        setFieldName(event.target.value)
    }

    function handleFieldLabelChange(event) {
        setFieldLabel(event.target.value)
    }

    function handleFieldDefaultChange(event) {
        setFieldDefault(event.target.value)
    }

    function handleFieldToolChange(event) {
        setFieldTooltipText(event.target.value)
    }

    function handleFieldCharChange(event) {
        setFieldChar(event.target.value)
    }

    function handleFieldTypeChange(option) {
        setSelectedFieldType(option)
        setFieldType(option.label)
    }

    function handleAddFieldClick() {
        const dialog = document.querySelector('.dialog');
        dialog.classList.add('dialog-open');
    }

    function handleCloseDialog() {
        const dialog = document.querySelector('.dialog');
        dialog.classList.remove('dialog-open');
    }

    function handleClear() {
        setFieldName("")
        setFieldLabel("")
        setFieldType("")
        setFieldDefault("")
        setFieldTooltipText("")
        setFieldChar("")
    }

    const handleSave = async () => {
        // console.log(entityName)
        // console.log(labelsingular)
        // console.log(labelplural)
        // console.log(type)
        // console.log(fields)
        try {
            if (!entityName || !type || !labelsingular || !labelplural || !fields) {
                alert("Please fill in all required fields.");
                return;
            }

            const entityFields = fields.map(field => ({
                name: field.name,
                required: field.required || false,
                type: field.data_type,
                field_name: field.name,
                // default_value: field.default_value || '',
                // field_constraints: field.field_constraints || '',
                active: field.active || true
            }));

            const result = await createEntity(entityName, selectedType, labelsingular, labelplural, entityFields);
            setEntityCreated(true);
            setEntityID(result.data.id)
            // alert('Entity created successfully:', result);
        } catch (error) {
            alert('Failed to create entity. Please try again.');
        }
    };

    function handleCancel() {
        setScreen("Home")
    }

    if (screen === "Home") {
        return <Home />
    }

    return (
        <>
            <div className="headers" style={{
                display: 'flex',
                backgroundColor: '#fff',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                top: 0,
                height: '4%',
                marginLeft: sidePanelCollapsed ? '4%' : '20%',
            }}>
                <LeftContainer>
                    <AdministrationText style={{ fontSize: '14px', textTransform: 'capitalize', color: '#71839B' }}>Administration</AdministrationText>
                    <ArrowRightIcon />
                    <AdministrationText style={{ fontSize: '14px', textTransform: 'capitalize' }}>Entity Manager</AdministrationText>
                    <ArrowRightIcon />
                    <AdministrationText style={{ fontSize: '14px', textTransform: 'capitalize' }}>Create Entity</AdministrationText>
                </LeftContainer>
                <RightContainer>
                    <IconButton>
                        <AccountIcon />
                    </IconButton>
                    <IconButton>
                        <MoreIcon />
                    </IconButton>
                </RightContainer>
            </div>
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
                            <button className="cancel" onClick={handleCancel}>
                                CANCEL
                            </button>
                            <button className="create" onClick={handleSave}>
                                SAVE
                            </button>
                        </div>
                    </div>
                </div>
                {
                    entityCreated && (
                        <div className="entity-fields">
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
                                    <button className="cancel"
                                        style={{
                                            fontSize: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            paddingLeft: '16px'
                                        }}
                                        onClick={handleAddFieldClick}>
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
                                                    .map((row) => (
                                                        console.log(row),
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
                        </div>
                    )
                }
            </div >
            <div className="dialog">
                <div className="dialog-header">
                    <text className="heading">Add Fields</text>
                    <CloseIcon onClick={handleCloseDialog} style={{ cursor: 'pointer' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: "flex", flexDirection: "row", marginTop: "2rem" }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Name"
                            defaultValue="Placeholder"
                            style={{ width: '50%' }}
                            value={fieldName}
                            onChange={handleFieldNameChange}
                        />

                        <TextField
                            required
                            id="outlined-required"
                            label="Label"
                            defaultValue=""
                            value={fieldLabel}
                            onChange={handleFieldLabelChange}
                            style={{ width: '50%', marginLeft: '1rem' }}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", marginTop: '1rem' }}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Type"
                            defaultValue={fieldType}
                            style={{ width: '50%' }}
                            onChange={handleFieldTypeChange}
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
                            label="Default Value"
                            defaultValue=""
                            value={fieldDefault}
                            onChange={handleFieldDefaultChange}
                            style={{ width: '50%', marginLeft: '1rem' }}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", marginTop: '1rem' }}>
                        <TextField
                            required
                            id="Tool-tip Text"
                            label="Tool-tip Text"
                            style={{ width: '100%' }}
                            value={fieldTooltipText}
                            onChange={handleFieldToolChange}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", marginTop: '1rem' }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Char Limit"
                            defaultValue="Placeholder"
                            style={{ width: '50%' }}
                            value={fieldChar}
                            onChange={handleFieldCharChange}
                        />
                    </div>
                    <div className="button-container" >
                        <button className="cancel" onClick={handleClear}>
                            CLEAR
                        </button>
                        <button className="create">
                            SAVE
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddEntity;
