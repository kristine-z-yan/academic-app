import * as React from 'react';
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import TestWrapper from "../components/TestWrapper/TestWrapper";

const  Test: React.FC = () => {
    return (
        <Box sx={{ width: '100%', height: '100vh' }}>
            <Grid item xs={12}>
                <h1>Test</h1>
            </Grid>
            <Grid container justifyContent="center">
                <TestWrapper />
            </Grid>
        </Box>
    );
}

export default Test;