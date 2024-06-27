import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    InputBase,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography
} from '@mui/material';
import styled from '@emotion/styled';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SidePanel from "../../componenets/SidePanel/SidePanel.js";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { getEntity } from '../../hooks/API/api.jsx';
import Home from '../Home/home.jsx'
import FormBuilder from '../FormBuilder/formbuilder.jsx';
// import FormBuilder from '../FormBuilder/formbuilder.jsx';

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
    marginLeft: '10px',
    '&:hover': {
        backgroundColor: '#1565C0',
        color: '#fff',
    },
    textTransform: 'capitalize',
});

const WhiteBox = styled(Box)({
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '25px 25px 0px 0px',
    padding: '24px',
    overflowY: 'auto',
    height: '48rem',
    '&::-webkit-scrollbar': {
        width: '0.3%',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#ccc',
        borderRadius: '10px',
    },
});

const Layout = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [sidePanelCollapsed, setSidePanelCollapsed] = useState(true);
    const [screen, setScreen] = useState("");
    const sidePanelRef = useRef(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOption, setSelectedOption] = useState("Option");
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [entitySelected, setEntitySelected] = useState(false);
    const [entities, setEntities] = useState([])
    const [entityID, setEntityID] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getEntity();
                const transformedData = result.map((entity, index) => ({
                    entity_id: entity.id,
                    id: 1 + index,
                    name: entity.name,

                }));
                console.log(transformedData)
                setEntities(transformedData)
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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleEntityClick = (entity) => {
        setSelectedEntity(entity);
        setEntityID(entity.entity_id)
        setEntitySelected(true);
    };

    // const filteredEntities = entities.filter(entity =>
    //     entity.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const filteredEntities = [
        { id: 1, name: "Entity One" },
        { id: 2, name: "Entity Two" },
        { id: 3, name: "Entity Three" },
        { id: 4, name: "Entity Four" },
        { id: 5, name: "Entity Five" },
        { id: 6, name: "Entity Six" },
        { id: 7, name: "Entity Seven" },
    ];

    const handleCreateEntity = () => {
        setScreen("formbuilder");
    };

    const handleSubOptionClick = (option) => {
        if (option === 'Entity Manager') {
            setScreen('entitymanager');
        }
    };

    if (screen === 'entitymanager') {
        return <Home />
    }

    if (screen === 'formbuilder') {
        return <FormBuilder entity_id={entityID} />
    }

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'code', label: 'ISO Code', minWidth: 100 },
        {
            id: 'population',
            label: 'Population',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'size',
            label: 'Size (km²)',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'density',
            label: 'Density',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toFixed(2),
        },
    ];

    const rows = [
        { name: 'India', code: 'IN', population: 1324171354, size: 3287263, density: 403 },
        { name: 'China', code: 'CN', population: 1403500365, size: 9596961, density: 146 },
        { name: 'Italy', code: 'IT', population: 60483973, size: 301340, density: 201 },
        { name: 'United States', code: 'US', population: 327167434, size: 9833520, density: 33.2 },
        { name: 'Canada', code: 'CA', population: 37602103, size: 9984670, density: 3.8 },
        { name: 'Australia', code: 'AU', population: 25475400, size: 7692024, density: 3.3 },
        { name: 'Germany', code: 'DE', population: 83019200, size: 357578, density: 232 },
        { name: 'Ireland', code: 'IE', population: 4857000, size: 70273, density: 69 },
        { name: 'Mexico', code: 'MX', population: 126577691, size: 1972550, density: 64 },
        { name: 'Japan', code: 'JP', population: 126317000, size: 377973, density: 334 },
        { name: 'France', code: 'FR', population: 67022000, size: 640679, density: 104 },
        { name: 'United Kingdom', code: 'GB', population: 67545757, size: 242495, density: 278 },
        { name: 'Russia', code: 'RU', population: 146793744, size: 17098242, density: 8.6 },
        { name: 'Nigeria', code: 'NG', population: 200962417, size: 923768, density: 217 },
        { name: 'Brazil', code: 'BR', population: 210147125, size: 8515767, density: 25 },
    ];

    return (
        <div>
            <div className="headers" style={{
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
                    <AdministrationText style={{ fontSize: '14px', textTransform: 'capitalize' }}>Entity </AdministrationText>
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
            </div>

            <Box display="flex" margin="20px 0" marginLeft={sidePanelCollapsed ? '6%' : '22%'}>
                <Box display="flex" flexDirection="column" width="20%">
                    <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '10px' }}>
                        Entity
                    </Typography>
                    <WhiteBox height="100%" maxHeight="calc(100vh - 200px)" overflow="auto">
                        <SearchContainer>
                            <SearchInput
                                placeholder="Search Entities"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                endAdornment={<SearchIcon />}
                            />

                        </SearchContainer>
                        <Box marginTop={'20px'}>
                            <List >
                                {filteredEntities.map((entity) => (
                                    <ListItem>
                                        <button className='entity-select' key={entity.id} onClick={() => handleEntityClick(entity)}>
                                            <ListItemText primary={entity.name} />
                                        </button>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </WhiteBox>
                </Box>
                <Box display="flex" flexDirection="column" width="65%">
                    {entitySelected &&
                        <Box display="flex" justifyContent="flex-end" mb={1} width='120%'>
                            <CreateButton onClick={handleCreateEntity}>
                                Create {selectedEntity ? selectedEntity.name : selectedOption} <AddIcon style={{ marginLeft: '4px' }} />
                            </CreateButton>
                        </Box>
                    }
                    {entitySelected &&
                        <WhiteBox overflow="auto" width={'120%'}>
                            {selectedEntity && (
                                <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '10px' }}>
                                    {selectedEntity.name}
                                </Typography>
                            )}
                            <Paper sx={{ width: '100%' }}>
                                <TableContainer>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
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
                                                .map((row, index) => {
                                                    return (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                            {columns.map((column) => {
                                                                const value = row[column.id];
                                                                return (
                                                                    <TableCell key={column.id} align={column.align}>
                                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                                    </TableCell>
                                                                );
                                                            })}
                                                        </TableRow>
                                                    );
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </WhiteBox>}
                </Box>
            </Box>
        </div >
    );
};

export default Layout;
