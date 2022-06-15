import * as React from "react";
import {
    Link
} from "react-router-dom";

import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Courses from "../../pages/Courses";


const drawerWidth = 240;

const links = [
    {
        text: 'Courses',
        path: ''
    },
    {
        text: 'To Do',
        path: 'to-do'
    }
];

const Sidebar = () => {
    const listItems = links.map((link) => {
        return (
            <ListItem key={link.text} disablePadding>
                <Link to={'/' + link.path}>{link.text}</Link>
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
            <Toolbar />
            <List>
                { listItems }
            </List>
        </Drawer>
    )
}

export default Sidebar;