import * as React from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import { Grid, TextField } from "@mui/material";

import questions from "./questions";

interface Answer {
    id: number,
    answer: string
}

const TestWrapper: React.FC = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [answerText, setAnswerText] = React.useState("");
    const [answers, setAnswers] = React.useState<Answer[]>([]);
    const maxSteps = questions.length;
    const completed = activeStep === maxSteps;

    const handleNext = () => {
        let foundAnswer = answers.find(item => item.id === questions[activeStep].id);
        foundAnswer ? foundAnswer.answer = answerText: answers.push({
            id: questions[activeStep].id,
            answer: answerText
        });

        // setAnswers((prevState) => {
        //
        //     return  [...prevState, answers]
        // })
        console.log(answers, 'next');
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setAnswerText('')
    };

    const handleBack = () => {
        // answers[questions[activeStep].id] = answerText;
        console.log(answers.length, 'back');
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setAnswerText('')
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.trim() !== "") setAnswerText(event.target.value)
    }

    const finishTestHandler = () => {

    }

    return (
        <Grid item xs={7} sx={{border: '2px solid #fff'}}>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 50,
                    pl: 2,
                    bgcolor: 'background.default',
                }}
            >
                <Typography>Please fill the fields</Typography>
            </Paper>
            <Box sx={{ height: 400, maxWidth: 800, width: '100%', p: 4 }}>
                {completed && (
                    <>
                        <Paper square elevation={0} sx={{ p: 3 }}>
                            <Typography>All steps completed - you&apos;re finished</Typography>
                            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                Reset
                            </Button>
                        </Paper>
                        <Button variant="contained" color="success" onClick={finishTestHandler}>
                            Finish
                        </Button>
                    </>
                )}
                {!completed && (
                    <>
                        <Typography>{questions[activeStep].question}</Typography>
                        <TextField
                            required
                            id="outlined-required"
                            label={questions[activeStep].label}
                            sx={{marginTop: '30px'}}
                            data-id={questions[activeStep].id}
                            onChange={changeInputHandler}
                            value={answerText}
                        />
                    </>
                )}
            </Box>
            <MobileStepper
                variant="text"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps}
                    >
                        Next
                        <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        <KeyboardArrowLeft />
                        Back
                    </Button>
                }
            />

        </Grid>
    )
}

export default TestWrapper;