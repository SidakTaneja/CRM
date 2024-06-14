import React from 'react';
import styled from '@emotion/styled';
import {
    Box,
    Button,
    IconButton,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
    width: '20%',
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

const Header = ({ sidePanelCollapsed }) => {
    return (
        <div className="headers" style={{
            display: 'flex',
            backgroundColor: '#fff',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
            width: '100%',
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
    );
};

export default Header;
