import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {Grid} from "@mui/material";

const Courses = () => {
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <h1>Courses</h1>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        <Tab value="one" label="Popular" />
                        <Tab value="two" label="Favorite" />
                        <Tab value="three" label="New" />
                    </Tabs>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Courses;