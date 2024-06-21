import React, { useRef, useState, useEffect } from "react";
import Select from "react-select";
import "./addentity.css";
import { updatetable, getTable } from "../data";
import Home from "../Home/home.jsx";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import SidePanel from "../SidePanel/SidePanel.js";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import styled from "@emotion/styled";
import {
  IconButton,
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
  Button,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";

function AddEntity({ selectedRow }) {
  const [type, setType] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedfieldType, setSelectedFieldType] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [entityName, setEntityName] = useState("");
  const [labelsingular, setLabelsingular] = useState("");
  const [labelplural, setLabelplural] = useState("");
  const [screen, setScreen] = useState("");
  const [sidePanelCollapsed, setSidePanelCollapsed] = useState(true);
  const sidePanelRef = useRef(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [fieldName, setFieldName] = useState("");
  const [fieldLabel, setFieldLabel] = useState("");
  const [fieldDefault, setFieldDefault] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [fieldChar, setFieldChar] = useState("");
  const [fieldTooltipText, setFieldTooltipText] = useState("");
  const [currentView, setCurrentView] = useState('fields'); // Added state for current view


  const initialColumns = [
    { id: "name", label: "Name", minWidth: 150 },
    { id: "label", label: "Label", minWidth: 150 },
    { id: "type", label: "Type", minWidth: 150 },
    { id: "module", label: "Required", minWidth: 150 },
  ];

  const relationshipColumns = [
    { id: "entity", label: "Entity", minWidth: 150 },
    { id: "type", label: "Type", minWidth: 150 },
  ];

  const [columns, setColumns] = useState(initialColumns);

  const initialRows = [
    createData("Account", "Account", "Entity", "Sales"),
    createData("BpmnProcess", "Process", "Workflow", "Advanced"),
    createData("BpmnUserTask", "Process User Task", "Task", "Advanced"),
    createData("BpmnUserTask", "Process User Task", "Task", "Advanced"),
    createData("Account", "Account", "Entity", "Sales"),
    createData("BpmnProcess", "Process", "Workflow", "Advanced"),
    createData("BpmnUserTask", "Process User Task", "Task", "Advanced"),
  ];

  const relationshipRows = [
    { entity: "John Doe A", type: "One to Many" },
    { entity: "Jane Smith B", type: "Many to Many" },
    { entity: "Emily Jones C", type: "One to One" },
  ];

  const [rows, setRows] = useState(initialRows);

  const StyledTableCell = styled(TableCell)({
    color: "#613FAA",
    "&:hover": {
      textDecoration: "underline",
      color: "#1565C0",
    },
  });

  const FixedHeaderTable = styled(Table)({
    "& thead": {
      position: "sticky",
      top: 0,
      backgroundColor: "#f4f4f4",
      zIndex: 1,
    },
  });

  const SearchContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    color: "#999999",
  });

  const SearchInput = styled(InputBase)({
    borderRadius: "50px",
    marginRight: "10px",
    backgroundColor: "#f4f4f4",
    padding: "5px 10px",
    border: "1px solid #CCCCCC",
    color: "#999999",
    width: "100%",
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedRow) {
        setEntityName(selectedRow.name); // Populate entityName with selected row's name
        setSelectedType(selectedRow.type);
        setLabelsingular(selectedRow.label);
        setLabelplural(selectedRow.label + 's');// Set selectedType with selected row's type
    }
}, [selectedRow]);

  const typeOptions = [
    { value: "base", label: "Base" },
    { value: "baseplus", label: "Base Plus" },
    { value: "event", label: "Event" },
    { value: "person", label: "Person" },
    { value: "company", label: "Company" },
  ];

  const AdministrationText = styled(Button)({
    color: "#1565C0",
    "&:hover": {
      textDecoration: "underline",
      color: "#1565C0",
    },
  });

  const RightContainer = styled.div(({ sidePanelCollapsed }) => ({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: "1",
    position: "absolute",
    right: 0,
    top: 0,
    width: "40%",
  }));

  const LeftContainer = styled.div(({ sidePanelCollapsed }) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "fit",
    backgroundColor: "white",
    borderRadius: "8px",
    border: "2px solid #ececec",
    margin: "5px",
    marginLeft: "1.8%",
  }));

  const AccountIcon = styled(AccountCircleIcon)({
    color: "#613FAA",
    fontSize: "36px",
  });

  const MoreIcon = styled(MoreVertIcon)({
    color: "#613FAA",
    fontSize: "36px",
  });

  function handleTypeSelect(event) {
    setSelectedType(event.target.value); 
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
  function handleAddFieldClick() {
    setIsDialogOpen(true);
  }
  
  function handleCloseDialog() {
    setIsDialogOpen(false);
  }
  
  useEffect(() => {
    if (selectedRow) {
        setEntityName(selectedRow.name);
        setFieldType(selectedRow.type);
    }
}, [selectedRow]);


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function handleLabelsingularchange(event) {
    setLabelsingular(event.target.value);
  }

  function handleLabelpluralchange(event) {
    setLabelplural(event.target.value);
  }

  function handleFieldNameChange(event) {
    setFieldName(event.target.value);
  }

  function handleFieldLabelChange(event) {
    setFieldLabel(event.target.value);
  }

  function handleFieldDefaultChange(event) {
    setFieldDefault(event.target.value);
  }

  function handleSwitchToFields  ()  {
    setCurrentView("fields");
    setColumns(initialColumns);
    setRows(initialRows);
  };

  function handleSwitchToRelationships  ()  {
    setCurrentView("relationships");
    setColumns(relationshipColumns);
    setRows(relationshipRows);
  };

  function handleFieldToolChange(event) {
    setFieldTooltipText(event.target.value);
  }

  function handleFieldCharChange(event) {
    setFieldChar(event.target.value);
  }

  function handleFieldTypeChange(option) {
    setSelectedFieldType(option);
    setFieldType(option.label);
  }

  function createData(name, label, type, module) {
    return { name, label, type, module };
  }

  function handleAddFieldClick() {
    const dialog = document.querySelector(".dialog");
    dialog.classList.add("dialog-open");
  }

  function handleCloseDialog() {
    const dialog = document.querySelector(".dialog");
    dialog.classList.remove("dialog-open");
  }

  function handleClear() {
    setFieldName("");
    setFieldLabel("");
    setFieldType("");
    setFieldDefault("");
    setFieldTooltipText("");
    setFieldChar("");
  }

  function handleCancel() {
    setScreen("Home");
  }

  function changeToRelationshipView() {
    setColumns(relationshipColumns);
    setRows(relationshipRows);
    setCurrentView('relationships'); // Set current view to relationships
  }

  if (screen === "Home") {
    return <Home />;
  }

  return (
    <>
      <div
        className="headers"
        style={{
          display: "flex",
          backgroundColor: "#fff",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          top: 0,
          height: "4%",
          marginLeft: sidePanelCollapsed ? "4%" : "20%",
        }}
      ></div>

      <div
        className="headers"
        style={{
          display: "flex",
          backgroundColor: "#fff",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          top: 0,
          height: "4%",
          marginLeft: sidePanelCollapsed ? "4%" : "20%",
        }}
      >
        <LeftContainer>
          <AdministrationText style={{ fontSize: "14px", textTransform: "capitalize", color: "#71839B" }}>
            Administration
          </AdministrationText>
          <ArrowRightIcon />
          <AdministrationText style={{ fontSize: "14px", textTransform: "capitalize" }}>Entity Manager</AdministrationText>
          <ArrowRightIcon />
          <AdministrationText style={{ fontSize: "14px", textTransform: "capitalize" }}>Create Entity</AdministrationText>
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
            <TextField
                            required
                            id="outlined-required"
                            label="Name"
                            defaultValue=""
                            style={{ width: '32%' }}
                            // value={entityName}
                            value={selectedType}

                            onChange={handleEntityNameChange}
                        />

<TextField
  id="outlined-select-currency"
  select
  label="Select"
  value={selectedType}
  onChange={handleTypeSelect}
  style={{ width: '32%', marginLeft: '2rem' }}
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
                style={{ width: "32%", marginLeft: "2rem" }}
              />

              <TextField
                required
                id="outlined-required"
                label="Plural Label"
                defaultValue=""
                value={labelplural}
                onChange={handleLabelpluralchange}
                style={{ marginLeft: "2rem", width: "32%" }}
              />
            </div>
            <div className="button-container">
              <button className="cancel" onClick={handleCancel}>
                CANCEL
              </button>
              <button className="create">SAVE</button>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "2rem" }}>
          <text className="heading">Entity Fields</text>
        </div>
        <div className="button-container-2">
                <button
        onClick={handleSwitchToFields}
        className={` underlined-btn ${currentView === "fields" ? "selected" : ""}`}
        >
        Fields
        </button>
        <button
        onClick={handleSwitchToRelationships}
        className={`underlined-btn ${currentView === "relationships" ? "selected" : ""}`}
        >
        Relationships
        </button>
          <button className="underlined-btn-not-selected">Formula</button>
          <Box display="flex" justifyContent={"flex-end"} width={sidePanelCollapsed ? "78.2%" : "74%"}>
            <SearchContainer>
              <SearchInput placeholder="Search" endAdornment={<SearchIcon />} />
            </SearchContainer>
            <button
              className="cancel"
              style={{
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                paddingLeft: "16px",
              }}
              onClick={handleAddFieldClick}
            >
              <AddIcon />
              Add Field
            </button>
          </Box>
        </div>
        <Paper sx={{ width: "98%", marginTop: "1rem" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      style={{ minWidth: column.minWidth, color: "#999999" }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                      {columns.map((column) => (
                        <TableCell key={column.id} style={{ color: "#999999" }}>
                          {row[column.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <div className="modal">
      <div className="dialog">
        <div className="dialog-header">
          <text className="heading">Add Fields</text>
          <CloseIcon onClick={handleCloseDialog} style={{ cursor: "pointer" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "row", marginTop: "2rem" }}>
            <TextField
              required
              id="outlined-required"
              label="Name"
              defaultValue="Placeholder"
              style={{ width: "50%" }}
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
              style={{ width: "50%", marginLeft: "1rem" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: "1rem" }}>
            <TextField
              id="outlined-select-currency"
              select
              label="Type"
              defaultValue={fieldType}
              style={{ width: "50%" }}
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
              style={{ width: "50%", marginLeft: "1rem" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: "1rem" }}>
            <TextField
              required
              id="Tool-tip Text"
              label="Tool-tip Text"
              style={{ width: "100%" }}
              value={fieldTooltipText}
              onChange={handleFieldToolChange}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: "1rem" }}>
            <TextField
              required
              id="outlined-required"
              label="Char Limit"
              defaultValue="Placeholder"
              style={{ width: "50%" }}
              value={fieldChar}
              onChange={handleFieldCharChange}
            />
          </div>
          <div className="button-container">
            <button className="cancel" onClick={handleClear}>
              CLEAR
            </button>
            <button className="create">SAVE</button>
          </div>
        </div>
      </div>

      {/* <div className="dialog-relationship">
        <div className="dialog-header">
          <text className="heading">Add Relationships</text>
          <CloseIcon onClick={handleCloseDialog} style={{ cursor: "pointer" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "row", marginTop: "2rem" }}>
          <TextField
              id="outlined-select-currency"
              select
              label="Entity"
              defaultValue={fieldType}
              style={{ width: "49%" }}
              onChange={handleFieldTypeChange}
            >
              {typeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="outlined-select-currency"
              select
              label="Link Type"
              defaultValue={fieldType}
              style={{ marginLeft:"1%",width: "49%" }}
              onChange={handleFieldTypeChange}
            >
              {typeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          
          </div>
          <div className="button-container">
            <button className="cancel" onClick={handleClear}>
              CLEAR
            </button>
            <button className="create">SAVE</button>
          </div>
        </div>
        </div> */}
      </div>
    </>
  );
}

export default AddEntity;
