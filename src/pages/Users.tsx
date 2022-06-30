import * as React from 'react';

import Box from '@mui/material/Box';
import {Grid} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import UsersForm from "../components/UsersForm/UsersForm";
import UsersDatatable from "../components/UsersDatatable/UsersDatatable";


const Users: React.FC = () => {
    const [tab, setTab] = React.useState('create');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };
    return (
        <Box sx={{ width: '100%', height: '100vh' }}>
            <Grid item xs={12}>
                <h1>Users</h1>
            </Grid>
            <Grid item xs={12}>
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    <Tab value="create" label="Create User" />
                    <Tab value="datatable" label="Users Table" />
                </Tabs>
            </Grid>
            <Box>
                { tab === 'create' && <UsersForm /> }
                { tab === 'datatable' && <UsersDatatable /> }
            </Box>
        </Box>
    )
}

export default Users;