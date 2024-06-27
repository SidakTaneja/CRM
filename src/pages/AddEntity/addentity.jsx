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
import { getDefaultFields, createEntity, getFields, getFieldTypes, addField, useEntityID, getEnityData, updateEntity, updateField } from "../../hooks/API/api.jsx";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LayoutManager from '../LayoutManager/layout';

function AddEntity({ selectedEntityID }) {
    const [type, setType] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedfieldType, setSelectedFieldType] = useState();
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
    const [typeOptionsfield, setTypeOptionsfield] = useState([]);
    const [rows, setRows] = useState([]);
    const [modalOpen, setModalOpen] = useState(false)
    const [rerender, setRerender] = useState(true)
    const [editField, setEditField] = useState(false)
    const [fieldId, setFieldId] = useState()
    const [searchQuery, setSearchQuery] = useState("");

    const typeMapping = {
        "Integer": { type: 1, selectedType: "Integer" },
        "Bigint": { type: 2, selectedType: "Bigint" },
        "Double": { type: 3, selectedType: "Double" },
        "Boolean": { type: 4, selectedType: "Boolean" },
        "String": { type: 5, selectedType: "String" },
        "Date": { type: 6, selectedType: "Date" },
        "Time": { type: 7, selectedType: "Time" },
        "Timestamp": { type: 8, selectedType: "Timestamp" },
        "Timestamp without time zone": { type: 9, selectedType: "Timestamp without time zone" },
        "Uuid": { type: 10, selectedType: "Uuid" },
        "Json": { type: 11, selectedType: "Json" },
        "Array": { type: 12, selectedType: "Array" },
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (selectedEntityID !== undefined && selectedEntityID !== null) {
                    setEntityCreated(true)
                    const result = await getEnityData(selectedEntityID)
                    // console.log(result)
                    setEntityName(result.name)
                    setLabelsingular(result.singular_label)
                    setLabelplural(result.plural_label)
                    if (result.type === "Base" || result.type === "base") {
                        setType(1);
                        setSelectedType("Base");
                    } else if (result.type === "Person" || result.type === "person") {
                        setType(2);
                        setSelectedType("Person");
                    }
                    setEntityID(selectedEntityID)
                }
            } catch (error) {
                console.error('Error fetching entity:', error);
            }
        };
        fetchData();
    }, [selectedEntityID]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (type) {
                    const result = await getDefaultFields(type);
                    setFields(result.fields)
                    // console.log(fields)
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
                    const result = await getFields(entityID)
                    // console.log(result)
                    const transformedData = result.map(field => ({
                        id: field.id,
                        default: field.default_value,
                        description: field.description,
                        name: capitalizeFirstLetter(String(field.name)),
                        label: (field.label),
                        type: capitalizeFirstLetter(String(field.type)),
                        required: (String(field.required))
                    }))
                    // console.log(transformedData)
                    setRows(transformedData)
                    setRerender(false)
                }
            } catch (error) {
                console.error('Error fetching entity:', error);
            }
        };
        fetchData();
    }, [entityID, rerender]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getFieldTypes();
                const options = result
                    .filter(item => item.category === 'data-type')
                    .map((item, index) => ({
                        value: index + 1,
                        label: item.value.charAt(0).toUpperCase() + item.value.slice(1)
                    }))
                setTypeOptionsfield(options)
            } catch (error) {
                toast.error(error);
            }
        };
        fetchData();
    }, []);

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

    const handleSubOptionClick = (option) => {
        if (option === 'Layout Manager') {
            setScreen('layoutmanager');
        }
    };

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
        { value: 2, label: "Person" },
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
        const selectedOption = typeOptions.find(option => option.value === selectedValue);
        setSelectedType(selectedOption.label)
        setType(selectedValue);
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
        if (fieldType === "") {
            setFieldDefault(null)
        }
        setFieldDefault(event.target.value)
    }

    function handleFieldToolChange(event) {
        setFieldTooltipText(event.target.value)
    }

    function handleFieldCharChange(event) {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            setFieldChar(value);
        } else {
            toast.error("Please enter an integer value.");
        }
    }

    const handleFieldTypeChange = (event) => {
        const selectedValue = event.target.value;
        const selectedOption = typeOptionsfield.find(option => option.value === selectedValue);
        if (selectedOption) {
            setSelectedFieldType(selectedValue);
            setFieldType(selectedOption.label);
        }
    };

    function handleAddFieldClick() {
        handleClearAll()
        setEditField(false)
        setModalOpen(true)
    }

    function handleCloseDialog() {
        handleClearAll()
        setModalOpen(false)
    }

    function handleClear() {
        if (editField) {
            setFieldLabel("")
            setFieldDefault("")
            setFieldTooltipText("")
        } else {
            setFieldName("")
            setFieldLabel("")
            setFieldDefault("")
            setFieldTooltipText("")
            setSelectedFieldType(null)
        }
    }

    function handleClearAll() {
        setFieldName("")
        setFieldLabel("")
        setFieldDefault("")
        setFieldTooltipText("")
        setSelectedFieldType(null)

    }

    const handleSave = async () => {
        try {
            if (!entityName || !type || !labelsingular || !labelplural) {
                toast.error("Please fill in all required fields.");
                return;
            }

            const entityFields = fields.map(field => ({
                name: field.name,
                required: field.required || false,
                type: field.data_type,
                field_name: field.name,
                active: field.active || true
            }));
            console.log(entityFields)

            const result = await createEntity(entityName, selectedType, labelsingular, labelplural, entityFields);
            setEntityCreated(true);
            setEntityID(result.data.id)
            toast.success("Entity Created Successfully")
        } catch (error) {
            toast.error('Failed to create entity. Please try again.');
        }
    };

    const handleUpdateEntity = async () => {
        try {
            if (!labelsingular || !labelplural) {
                toast.error("Please fill in all the required fields")
                return;
            }

            const result = await updateEntity(entityID, labelsingular, labelplural)
            toast.success("Entity Updated Successfully")
        } catch (error) {
            toast.error('failed to update entity. Please try again.')
        }
    }

    const handleUpdateField = async () => {
        try {
            if (!fieldLabel || !fieldTooltipText) {
                toast.error("Please fill in all required fields.");
                return;
            }

            const result = await updateField(selectedEntityID, fieldId, fieldLabel, fieldTooltipText, fieldDefault)
            setRerender(true)
            toast.success('Field updated successfully');
            handleClear()
        } catch (error) {
            toast.error('Failed to update field. Please try again.');
        }
    }

    const handleCreateField = async () => {
        try {
            if (!fieldName || !fieldLabel || !fieldType || !fieldTooltipText) {
                toast.error("Please fill in all required fields.");
                return;
            }
            const result = await addField(entityID, fieldName, fieldLabel, fieldDefault, fieldTooltipText, fieldType)
            setRerender(true)
            toast.success('Field created successfully');
            handleClear()
        } catch (error) {
            toast.error('Failed to create entity. Please try again.');
        }
    }

    const handleEdit = (row) => {
        setModalOpen(false)
        setModalOpen(true)
        setFieldName(row.name)
        setFieldDefault(row.default)
        setFieldLabel(row.label)
        setFieldTooltipText(row.description)
        if (typeMapping[row.type]) {
            setSelectedFieldType(typeMapping[row.type].type);
        }
        setEditField(true)
        setFieldId(row.id)
    };

    function handleCancel() {
        setScreen("Home")
    }

    if (screen === "Home") {
        return <Home />
    }

    if (screen === "layoutmanager") {
        return <LayoutManager />;
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
                    <AdministrationText style={{ fontSize: '14px', textTransform: 'capitalize' }} onClick={() => setScreen("Home")}>Entity Manager</AdministrationText>
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
                <SidePanel collapsed={sidePanelCollapsed} onSubOptionClick={handleSubOptionClick} />
            </div >
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
                                disabled={entityCreated}
                            />

                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Select"
                                value={type}
                                defaultValue=""
                                style={{ width: '32%', marginLeft: '2rem' }}
                                onChange={handleTypeSelect}
                                disabled={entityCreated}
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
                            {!entityCreated && <button className="create" onClick={handleSave}>
                                SAVE
                            </button>}
                            {entityCreated && <button className="create" onClick={handleUpdateEntity}>
                                UPDATE
                            </button>}

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
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.name} onClick={() => handleEdit(row)}>
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
            {
                modalOpen && <div className="dialog">
                    <div>
                        <div className="dialog-header">
                            <text className="heading">Add Fields</text>
                            <CloseIcon onClick={handleCloseDialog} style={{ cursor: 'pointer' }} />
                        </div>
                        <div>
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
                                        disabled={editField}
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
                                        id="outlined-select"
                                        select
                                        label="Select"
                                        value={selectedfieldType}
                                        style={{ width: '50%' }}
                                        onChange={handleFieldTypeChange}
                                        disabled={editField}
                                    >
                                        {typeOptionsfield.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField
                                        id="outlined-required"
                                        label="Default Value"
                                        defaultValue=""
                                        value={fieldDefault}
                                        onChange={handleFieldDefaultChange}
                                        style={{ width: '50%', marginLeft: '1rem' }}
                                        disabled={editField}
                                    />
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", marginTop: '1rem' }}>
                                    <TextField
                                        required
                                        id="Tool-tip Text"
                                        label="Description"
                                        style={{ width: '100%' }}
                                        value={fieldTooltipText}
                                        onChange={handleFieldToolChange}
                                    />
                                </div>
                                {/* <div style={{ display: "flex", flexDirection: "row", marginTop: '1rem' }}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Char Limit"
                                    defaultValue="Placeholder"
                                    style={{ width: '50%' }}
                                    value={fieldChar}
                                    onChange={handleFieldCharChange}
                                />
                            </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="button-container">
                        <button className="cancel" onClick={handleClear}>
                            CLEAR
                        </button>
                        {!editField && <button className="create" onClick={handleCreateField}>
                            SAVE
                        </button>}
                        {editField && <button className="create" onClick={handleUpdateField}>
                            UPDATE
                        </button>}
                    </div>
                </div>
            }
            <ToastContainer />
        </>
    );
}

export default AddEntity;