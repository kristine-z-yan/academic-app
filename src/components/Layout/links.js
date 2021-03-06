import * as React from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupIcon from '@mui/icons-material/Group';

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
    },
    {
        text: 'Test',
        path: 'test',
        icon: <EmojiEventsIcon />
    },
    {
        text: 'Users',
        path: 'users',
        icon: <GroupIcon />
    }
];

export default links;