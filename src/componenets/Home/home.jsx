import React, { useState, useEffect, useRef } from 'react';
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
    TablePagination,
    IconButton,
    Typography,
    InputBase,
    Button
} from '@mui/material';
import styled from '@emotion/styled';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import SidePanel from '../SidePanel/SidePanel';
import AddEntity from '../AddEntity/addentity';

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
    createData('BpmnUserTask', 'Process User Task', 'Task', 'Advanced'),
    createData('Account', 'Account', 'Entity', 'Sales'),
    createData('BpmnProcess', 'Process', 'Workflow', 'Advanced'),
    createData('BpmnUserTask', 'Process User Task', 'Task', 'Advanced'),
    createData('BpmnUserTask', 'Process User Task', 'Task', 'Advanced'),
    createData('Account', 'Account', 'Entity', 'Sales'),
    createData('BpmnProcess', 'Process', 'Workflow', 'Advanced'),
    createData('BpmnUserTask', 'Process User Task', 'Task', 'Advanced'),
    createData('BpmnUserTask', 'Process User Task', 'Task', 'Advanced'),
    createData('NewAccount', 'New Account', 'Entity', 'Sales'),
    createData('NewProcess', 'New Process', 'Workflow', 'Advanced'),
    createData('NewTask', 'New Task', 'Task', 'Advanced'),
    createData('NewTask', 'New Task', 'Task', 'Advanced'),
    createData('NewAccount', 'New Account', 'Entity', 'Sales'),
    createData('NewProcess', 'New Process', 'Workflow', 'Advanced'),
    createData('NewTask', 'New Task', 'Task', 'Advanced'),
    createData('NewTask', 'New Task', 'Task', 'Advanced'),
    createData('NewAccount', 'New Account', 'Entity', 'Sales'),
    createData('NewProcess', 'New Process', 'Workflow', 'Advanced'),
    createData('NewTask', 'New Task', 'Task', 'Advanced'),
    createData('NewTask', 'New Task', 'Task', 'Advanced'),
];


const AdministrationText = styled(Button)({
    color: '#1565C0',
    '&:hover': {
        textDecoration: 'underline',
        color: '#1565C0',
    },
});

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
    width: '20  %',
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

const CreateButton = styled(Button)({
    border: '2px solid #1565C0',
    borderRadius: '50px',
    color: '#1565C0',
    backgroundColor: 'transparent',
    '&:hover': {
        backgroundColor: '#1565C0',
        color: '#fff',
    },
    textTransform: 'capitalize',
});

const StickyHeadTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [sidePanelCollapsed, setSidePanelCollapsed] = useState(false);
    const [screen, setScreen] = useState("")
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

    function handleCreateEntity() {
        setScreen("addentity")
    }

    if (screen === "addentity") {
        return <AddEntity />
    }

    return (
        <>
            <div sidePanelCollapsed={sidePanelCollapsed} className="headers" style={{
                display: 'flex',
                backgroundColor: '#fff',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                width: '%',
                top: 0,
                height: '4%',
                marginLeft: sidePanelCollapsed ? '4%' : '20%',
            }}>
                <LeftContainer>
                    <AdministrationText style={{ fontSize: '14px', textTransform: 'capitalize', color: '#71839B' }}>Administration</AdministrationText>
                    <ArrowRightIcon />
                    <AdministrationText style={{ fontSize: '14px', textTransform: 'capitalize' }}>Entity Manager</AdministrationText>
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

            <Box display="flex" width="100%" style={{ marginTop: "1%", padding: 0 }}>
                <div ref={sidePanelRef} onClick={handleClickOnPanel}>
                    <SidePanel collapsed={sidePanelCollapsed} />
                </div>
                <Container
                    style={{
                        flexGrow: 1,
                        marginLeft: sidePanelCollapsed ? '1%' : '253px',
                        padding: '0 5%',
                        transition: 'margin-left 0.3s ease',
                        width: '100%',
                        maxWidth: '100%',
                    }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px" width={"100%"} marginLeft={"3%"}>
                        <Typography variant="h5" style={{ fontWeight: '200' }}>Entity Manager</Typography>
                        <Box display="flex" alignItems="center">
                            <SearchContainer>
                                <SearchInput placeholder="Search" endAdornment={<SearchIcon />} />
                            </SearchContainer>
                            <CreateButton variant="contained" startIcon={<AddIcon />} onClick={handleCreateEntity}>
                                Create Entity
                            </CreateButton>
                        </Box>
                    </Box>
                    <Paper sx={{ width: '98%', marginTop: '1rem', marginLeft:'3%' }}>
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
                </Container>
            </Box>
        </>
    );
};

export default StickyHeadTable;