import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { getTable } from '../data';
import AddEntity from '../AddEntity/addentity';
import { Add } from '@mui/icons-material';

const Container = styled(Box)({
    display: 'flex',
    height: '100vh',
    padding: '15px',
    justifyContent: 'left',
    flexDirection: 'column',
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
});

const SidePanel = styled(motion.div)({
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#f4f4f4',
    boxShadow: '2px 0 2px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
});

const IconWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    cursor: 'pointer',
    transition: 'background-color 0.5s',
    '&:hover': {
        backgroundColor: '#B1B0B0'
    },
}));

const IconText = styled(Box)({
    marginLeft: '10px',
});

const icons = [
    { icon: <HomeIcon />, label: 'Home' },
    { icon: <PersonIcon />, label: 'Profile' },
    { icon: <SettingsIcon />, label: 'Settings' },
];

const tableData = getTable()

const StyledTableCell = styled(TableCell)({
    border: '1px solid rgba(224, 224, 224, 1)',
    padding: '8px',
    width: '500%',
});

const StyledTable = styled(Table)({
    width: '4000px',
});

const TableContainerStyled = styled(TableContainer)({
    flex: '1',
    overflowY: 'auto', // Add overflow-y for vertical scrolling
});

const CommonButton = styled(Button)({
    marginRight: '0',
    minWidth: '0',
    color: '#525252',
    backgroundColor: 'white',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    height: '30px',
    padding: '0 12px',
    border: '2px solid rgba(224, 224, 224, 1)',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
});

function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [screen, setScreen] = useState("")

    function handleSearchChange(event) {
        setSearchTerm(event.target.value);
    }

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function createEntity() {
        setScreen("AddEntity")
    }

    if (screen === "AddEntity") {
        return <AddEntity />
    }

    return (
        <Container>
            <Box style={{ width: '100%', marginBottom: '20px', textAlign: 'left' }}>
                <Typography variant="h4" gutterBottom style={{ fontFamily: 'sans-serif' }}>
                    Entity Manager
                </Typography>
            </Box>
            <AnimatePresence>
                <SidePanel
                    initial={{ width: '60px' }}
                    animate={{ width: isPanelOpen ? '250px' : '60px' }}
                    exit={{ width: '60px' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    <IconWrapper onClick={() => setIsPanelOpen(!isPanelOpen)}>
                        <MenuIcon />
                    </IconWrapper>
                    {icons.map((item, index) => (
                        <IconWrapper key={index}>
                            {item.icon}
                            {isPanelOpen && <IconText>{item.label}</IconText>}
                        </IconWrapper>
                    ))}
                </SidePanel>
            </AnimatePresence>
            <Box style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', width: '100%', justifyContent: 'left' }}>
                <CommonButton
                    variant="contained"
                    endIcon={<AddIcon />}
                    sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' } }}
                    onClick={createEntity}
                >
                    Create Entity
                </CommonButton>
                <Box style={{ marginLeft: '10px' }}>
                    <IconButton onClick={handleMenuClick} size="small" style={{ padding: '0', height: '100%' }}>
                        <MoreHorizIcon />
                    </IconButton>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    sx={{ maxWidth: '100px' }}
                >
                    <MenuItem onClick={handleMenuClose} sx={{ padding: '1px 8px', fontSize: '12px' }}>Export</MenuItem>
                </Menu>
            </Box>
            <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                    style: { height: '50px', padding: '0 10px' },
                }}
                InputLabelProps={{
                    style: { lineHeight: '30px', fontSize: '16px', margin: '0 0px' },
                }}
                style={{ width: '100%', marginBottom: '20px' }}
            />
            <Box style={{ overflowX: 'auto', width: '100%' }}>
                <TableContainerStyled component={Paper} sx={{ boxShadow: '0px -1px 5px rgba(0, 0, 0, 0.2)' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Label</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Module</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.label}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.module}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainerStyled>
            </Box>
        </Container>
    );
};

export default Home;