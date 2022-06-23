import * as React from 'react';
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import TestWrapper from "../components/TestWrapper/TestWrapper";
import TestResult from "../components/TestResult/TestResult";

const  Test: React.FC = () => {
    return (
        <Box sx={{ width: '100%', minHeight: ''}}>
            <Grid item xs={12}>
                <h1>Test</h1>
            </Grid>
            <Grid container justifyContent="center">
                {/*<TestWrapper />*/}
                <TestResult />
            </Grid>
        </Box>
    );
}

export default Test;