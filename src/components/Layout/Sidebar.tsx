import * as React from "react";
import {
    Link
} from "react-router-dom";

// import Courses from "../../pages/Courses";

import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {ListItemIcon} from "@mui/material";

// import classes from './Sidebar.module.css';

const drawerWidth = 240;

const links = [
    {
        text: 'Courses',
        path: '',
        icon: <DashboardIcon />
    },
    {
        text: 'To Do',
        path: 'to-do',
        icon: <FormatListBulletedIcon />
    }
];

const Sidebar = () => {
    const listItems = links.map((link) => {
        return (
            // <ListItem key={link.text} className={classes['nav-item']}>
            <ListItem key={link.text}>
                <ListItemIcon>
                    {link.icon}
                </ListItemIcon>
                <Link to={'/' + link.path} >{link.text}</Link>
            </ListItem>
        )
    })

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar sx={{ bgcolor: '#e9decf'}}/>
            <List sx={{ bgcolor: '#e9decf', height: '100vh'}}>
                { listItems }
            </List>
        </Drawer>
    )
}

export default Sidebar;