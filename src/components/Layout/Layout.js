import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";

import Sidebar from "./Sidebar";

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Courses from "../../pages/Courses";
import ToDo from "../../pages/ToDo";

const drawerWidth = 240;

const Layout = (props) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Router>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: '#a697bd' }}

            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        My First App
                    </Typography>
                </Toolbar>
            </AppBar>
            <Sidebar />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: '#fbfbfb', p: 3 }}
            >
                <Toolbar />
                <Routes>
                    <Route path="/" element={<Courses />} />
                    <Route path="/to-do" element={<ToDo />} />
                </Routes>
            </Box>
            </Router>
        </Box>
    );
}

export default Layout;
