import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import styled from '@emotion/styled';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import BuildIcon from '@mui/icons-material/Build';
import EmailIcon from '@mui/icons-material/Email';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import WorkIcon from '@mui/icons-material/Work';
import LoopIcon from '@mui/icons-material/Loop';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import logo from '../Images/logo_fortrea.png';
import smallLogo from '../Images/smallLogo.png';

const subOptions = {
    System: [
        'Settings', 'User Interface', 'Authentication', 'Scheduled Jobs', 'Currency',
        'Notifications', 'Integrations', 'Extensions', 'System Requirements', 'Job Settings',
        'Upgrade', 'Clear Cache', 'Rebuild'
    ],
    Users: [
        'Users', 'Teams', 'Roles', 'Auth Log', 'Auth Tokens', 'Action History', 'API Users'
    ],
    Customization: [
        'Entity Manager', 'Layout Manager', 'Label Manager', 'Template Manager', 'Report Filters', 'Report Panels'
    ],
    Messaging: [
        'Outbound Emails', 'Inbound Emails', 'Group Email Accounts', 'Personal Email Accounts', 'Email Filters',
        'Group Email Folders', 'Email Templates', 'SMS'
    ],
    Portal: [
        'Portals', 'Portal Users', 'Portal Roles'
    ],
    Setup: [
        'Working Time Calendars', 'Layout Sets', 'Dashboard Templates', 'Lead Capture', 'PDF Templates', 'Webhooks', 'Authentication Providers'
    ],
    Data: [
        'Import', 'Attachments', 'Jobs', 'Email Addresses', 'Phone Numbers'
    ],
    Misc: [
        'Formula Sandbox'
    ],
    Workflows: [
        'Workflows'
    ],
    Business: [
        'Flowcharts', 'Processes'
    ],
    SalesPack: [
        'Settings', 'Price Rule Conditions'
    ]
};

const menuIcons = {
    System: <SettingsIcon />,
    Users: <GroupIcon />,
    Customization: <BuildIcon />,
    Messaging: <EmailIcon />,
    Portal: <AccountTreeIcon />,
    Setup: <DashboardIcon />,
    Data: <DataUsageIcon />,
    Misc: <MiscellaneousServicesIcon />,
    Workflows: <WorkIcon />,
    Business: <LoopIcon />,
    SalesPack: <AttachMoneyIcon />,
};

const SidePanelContainer = styled(Box)(({ collapsed }) => ({
    width: collapsed ? '4%' : '20%',
    backgroundColor: '#613FAA',
    color: '#fff',
    height: '100vh',
    paddingTop: '20px',
    paddingLeft: '5px',
    paddingRight: collapsed ? '5px' : '10px',
    boxSizing: 'border-box',
    position: 'fixed',
    left: 0,
    top: 0,
    transition: 'width 0.3s ease',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        width: '0px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '10px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
    },
}));

const CompanyLabel = styled.div(({ collapsed }) => ({
    textAlign: 'center',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: collapsed ? 'center' : 'flex-start',
    width: collapsed ? '40px' : 'auto', 
    marginLeft: collapsed ? ' 17.5%':'',
}));

const CompanyLogo = styled.img(({ collapsed }) => ({
    width: collapsed ? '24px' : '100px',
    height: collapsed ? '24px' : 'auto',
    marginRight: collapsed ? '0' : '10px',
}));

const MainButton = styled(ListItem)(({ collapsed }) => ({
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#7D53D6',
        borderRadius: '10px', // Added border radius on hover
    },
    justifyContent: collapsed ? 'center' : 'flex-start',
}));

const MainListItemText = styled(ListItemText)(({ collapsed }) => ({
    display: collapsed ? 'none' : 'block',
    fontSize: '10px',
}));

const IconWrapper = styled(ListItemIcon)(({ collapsed }) => ({
    marginLeft: collapsed ? '25px' : '0px',
    color: '#fff',
}));

const SubOption = styled(ListItem)({
    paddingLeft: '20px',
    fontSize: '14px',
});

const ArrowIcon = styled(ArrowDropDownIcon)(({ open }) => ({
    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.3s ease',
}));

const SidePanel = ({ collapsed }) => {
    const [openMenus, setOpenMenus] = useState({});

    const handleToggleMenu = (menu) => {
        setOpenMenus((prev) => ({
            ...prev,
            [menu]: !prev[menu],
        }));
    };

    return (
        <SidePanelContainer collapsed={collapsed}>
            <CompanyLabel collapsed={collapsed}>
                <CompanyLogo src={collapsed ? smallLogo : logo} alt="Fortrea Logo" collapsed={collapsed} />
            </CompanyLabel>
            <List component="nav">
                {Object.keys(subOptions).map((mainOption) => (
                    <React.Fragment key={mainOption}>
                        <MainButton button onClick={() => handleToggleMenu(mainOption)} collapsed={collapsed}>
                            <IconWrapper collapsed={collapsed}>
                                {menuIcons[mainOption]}
                            </IconWrapper>
                            <MainListItemText primary={mainOption} collapsed={collapsed} />
                            {!collapsed && <ArrowIcon open={openMenus[mainOption]} />}
                        </MainButton>
                        <Collapse in={openMenus[mainOption] && !collapsed} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {subOptions[mainOption].map((subOption) => (
                                    <SubOption key={subOption}>
                                        <ListItemText primary={subOption} />
                                    </SubOption>
                                ))}
                            </List>
                        </Collapse>
                    </React.Fragment>
                ))}
            </List>
        </SidePanelContainer>
    );
};

export default SidePanel;





