import * as React from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import { Grid, TextField} from "@mui/material";

import questions from "../questions";

interface Answer {
    id: number,
    answer: string,
    isCorrect: boolean
}

const TestWrapper: React.FC = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [showError, setShowError] = React.useState(false);
    const [emptyAnswers, setEmptyAnswers] = React.useState<Answer[]>([]);
    const [answerText, setAnswerText] = React.useState("");
    const [answers, setAnswers] = React.useState<Answer[]>([]);
    const maxSteps = questions.length;
    const completed = activeStep === maxSteps;

    React.useEffect(() => {
        if (answers[activeStep]) setAnswerText(answers[activeStep].answer);
        // emptyAnswers.forEach( (item) => {
        //     console.log(item.id );
        //     // if (item.id === answers[activeStep].id) {
        //     //     setShowError(true);
        //     // } else {
        //     //     setShowError(false);
        //     // }
        // })
    }, [activeStep, answers, emptyAnswers]);

    answers.length = questions.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        answers[activeStep] = {
            id: questions[activeStep].id,
            answer: answerText,
            isCorrect: answerText === questions[activeStep].rightAnswer
        };
        setAnswerText("")
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setAnswers([]);
        setShowError(false);
        setAnswerText("")
    };

    const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswerText(event.target.value);
        setShowError(false)
    }

    const finishTestHandler = () => {
    // todo validate answers
        let empty = answers.filter( (item, index) => item.answer.trim() === "");
        // console.log(emptyAnswers);
        if (empty.length === 0) {
            // show results

        } else {
            // back to first empty answer
            // setEmptyAnswers(empty);
            // setShowError(true);
        }
    }

    return (
        <Grid item xs={6} sx={{border: '2px solid #fff'}}>
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
                <Typography>Please fill the fields for final result.</Typography>
            </Paper>
            <Box sx={{ height: 400, maxWidth: 800, width: '100%', p: 4 }}>
                {completed && (
                    <Typography>All steps completed - you&apos;re finished</Typography>
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
                        {showError && <Typography color="red" variant="subtitle2">This field must not be empty</Typography>}
                    </>
                )}
            </Box>
            {completed && (
                <Paper  sx={{
                    display: 'flex',
                    justifyContent: "space-between",
                    alignItems: 'center',
                    height: 48,
                    pl: 1,
                    bgcolor: 'background.default',
                    boxShadow: 'none'
                }} >
                    <Button onClick={handleBack} disabled={activeStep === 0} size="small">
                        <KeyboardArrowLeft />
                        Back
                    </Button>
                    <Grid sx={{ marginRight: '15px'}}>
                        <Button onClick={handleReset} variant="outlined" sx={{ marginRight: '15px'}} size="small">
                            Reset
                        </Button>
                        <Button variant="contained" color="success" onClick={finishTestHandler}>
                            Finish
                        </Button>
                    </Grid>
                </Paper>
            )}
            {!completed &&
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
            }
        </Grid>
    )
}

export default TestWrapper;