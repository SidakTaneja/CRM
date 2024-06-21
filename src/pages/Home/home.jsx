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
import SidePanel from '../../componenets/SidePanel/SidePanel';
import AddEntity from '../AddEntity/addentity';
import { getEntity, transformEntity } from '../../hooks/API/api';
import { transform } from 'framer-motion';

const columns = [
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'label', label: 'Label', minWidth: 150 },
    { id: 'type', label: 'Type', minWidth: 150 },
    { id: 'module', label: 'Module', minWidth: 150 },
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
    width: 'fit-content',
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
    const [sidePanelCollapsed, setSidePanelCollapsed] = useState(true);
    const [screen, setScreen] = useState("");
    const sidePanelRef = useRef(null);
    const [data, setData] = useState([]);

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getEntity();
                // console.log(result);
                const transformedData = result.map(entity => {
                    return {
                        name: entity.name,
                        label: entity.singular_label,
                        type: capitalizeFirstLetter(entity.type),
                        module: 'Custom'
                    };
                });
                setData(transformedData);
                // console.log(transformedData);
            } catch (error) {
                console.error('Error fetching entity:', error);
            }
        };
        fetchData();
    }, []);

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

    const handleCreateEntity = () => {
        setScreen("addentity");
    };

    if (screen === "addentity") {
        return <AddEntity />;
    }

    return (
        <div style={{ backgroundColor: '#f6f6fc' }}>
            <div sidePanelCollapsed={sidePanelCollapsed} className="headers" style={{
                display: 'flex',
                backgroundColor: '#fff',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                width: '96%',
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

            <Box display="flex" width="100%" style={{ marginTop: "1%", padding: 0, backgroundColor: '#f6f6fc' }}>
                <div ref={sidePanelRef} onClick={handleClickOnPanel}>
                    <SidePanel collapsed={sidePanelCollapsed} />
                </div>
                <Container
                    style={{
                        flexGrow: 1,
                        marginLeft: sidePanelCollapsed ? '1%' : '253px',
                        padding: '0 5%',
                        transition: 'margin-left 0.3s ease',
                        width: '102.7%',
                        maxWidth: '100%',
                    }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px" width={"102.7%"} marginLeft={sidePanelCollapsed ? '1.5%' : '3%'}>
                        <Typography variant="" style={{ fontWeight: '600', fontSize: '22px' }}>Entity Manager</Typography>
                        <Box display="flex" alignItems="center">
                            <SearchContainer>
                                <SearchInput placeholder="Search" endAdornment={<SearchIcon />} />
                            </SearchContainer>
                            <CreateButton variant="contained" startIcon={<AddIcon />} onClick={handleCreateEntity}>
                                Create
                            </CreateButton>
                        </Box>
                    </Box>
                    <Paper sx={{ width: '102.7%', marginTop: '1rem', marginLeft: sidePanelCollapsed ? '1.5%' : '3%' }}>
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
                                        {data
                                            .map((row, index) => (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>

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
        </div>
    );
};

export default StickyHeadTable;
