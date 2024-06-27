import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Button,
    IconButton,
    Typography
} from '@mui/material';
import styled from '@emotion/styled';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SidePanel from "../../componenets/SidePanel/SidePanel.js";
import LayoutManager from '../LayoutManager/layout';
import Home from '../Home/home';
import Form from './form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLayout } from '../../hooks/API/api.jsx';

const FormBuilder = ({ entity_id, entity_name }) => {
    const [sidePanelCollapsed, setSidePanelCollapsed] = useState(true);
    const [screen, setScreen] = useState("");
    const sidePanelRef = useRef(null);

    const handleClickOnPanel = () => {
        setSidePanelCollapsed(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (sidePanelRef.current && !sidePanelRef.current.contains(event.target)) {
            setSidePanelCollapsed(true);
        }
    };

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


    const WhiteBox = styled(Box)({
        backgroundColor: '#fff',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
        margin: '25px 0',
        padding: '20px',
        overflowY: 'auto',
        height: '110%',
        '&::-webkit-scrollbar': {
            width: '0.3%',
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#ccc',
            borderRadius: '10px',
        },
    });


    const handleSubOptionClick = (option) => {
        if (option === 'Layout Manager') {
            setScreen('layoutmanager');
        }

        if (option === 'Entity Manager') {
            setScreen('entitymanager');
        }
    };



    if (screen === "layoutmanager") {
        return <LayoutManager />;
    }

    if (screen === "entitymanager") {
        return <Home />;
    }

    return (
        <div style={{ backgroundColor: '#f6f6fc' }}>
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
                    <AdministrationText style={{ fontSize: '14px', textTransform: 'capitalize' }} onClick={() => setScreen("Layout")}>Entity </AdministrationText>
                    <ArrowRightIcon />
                    <AdministrationText style={{ fontSize: '14px', textTransform: 'capitalize' }}>Form </AdministrationText>
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

            <Box display="flex" justifyContent="space-between" margin="20px 0" marginLeft={sidePanelCollapsed ? '6%' : '22%'}>
                <Box display="flex" flexDirection="column" width="98.5%">
                    <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '10px' }}>
                        Form
                    </Typography>
                    <WhiteBox> <Form entity_id={entity_id} entity_name={entity_name} /></WhiteBox>

                </Box>

            </Box>
        </div>
    );
};

export default FormBuilder;