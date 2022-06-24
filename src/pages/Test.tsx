import * as React from 'react';
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import TestWrapper from "../components/TestWrapper/TestWrapper";
import TestResult from "../components/TestResult/TestResult";
import Answer from '../models/answer';
import {useState} from "react";

const  Test: React.FC = () => {
    const [finalAnswers, setFinalAnswers] = useState<Answer[]>([]);

    const onFinishHandler = (answers: Answer[]) => {
        setFinalAnswers(answers);
    }

    const onResetHandler = (reset: boolean) => {
        if (reset) setFinalAnswers([]);
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Grid item xs={12}>
                <h1>Test</h1>
            </Grid>
            <Grid container justifyContent="center">
                { finalAnswers.length === 0 && <TestWrapper onFinish={onFinishHandler}/> }
                { finalAnswers.length > 0 && <TestResult answers={finalAnswers} onReset={onResetHandler}/> }
            </Grid>
        </Box>
    );
}

export default Test;