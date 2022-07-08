import * as React from "react";
import { useState } from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import { Grid, TextField} from "@mui/material";

import questions from "../questions";
import Answer from '../../models/answer'

const TestWrapper: React.FC<{onFinish: (answers: Answer[]) => void }>= (props) => {
    // TODO:
    // const [ state, setState ] = useState({
    //     currentStep: 0,
    //     steps: {
    //         first: { value },
    //         second: { value },
    //     }
    // })

    const [activeStep, setActiveStep] = useState(0);
    const [showError, setShowError] = useState(false);
    const [answerText, setAnswerText] = useState("");
    const [answers, setAnswers] = useState<Answer[]>([]);
    const maxSteps = questions.length;
    const completed = activeStep === maxSteps;

    answers.length = questions.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        // TODO:
        // setAnswers({
        //     ...answers,
        //     [activeStep]: {
        //         id: questions[activeStep].id,
        //         answer: answerText,
        //         isCorrect: answerText === questions[activeStep].rightAnswer
        //     }
        // })

        answers[activeStep] = {
            id: questions[activeStep].id,
            answer: answerText,
            isCorrect: answerText === questions[activeStep].rightAnswer
        };

        (answers[activeStep+1]  && answers[activeStep+1].answer !== "") ?
            setAnswerText(answers[activeStep+1].answer):
            setAnswerText("")
    };

    const handleBack = () => {
        answers[activeStep] = {
            id: questions[activeStep].id,
            answer: answerText,
            isCorrect: answerText === questions[activeStep].rightAnswer
        };
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setAnswerText(answers[activeStep-1].answer)
    };

    const handleReset = () => {
        setActiveStep(0);
        setAnswers([]);
        setShowError(false);
        setAnswerText("")
    };

    const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswerText(event.target.value);
    }

    const finishTestHandler = () => {
        let emptyAnswers = answers.filter( (item, index) => item.answer.trim() === "");
        if (emptyAnswers.length === 0) {
            props.onFinish(answers);
        } else {
            let index = questions.findIndex( (item) => item.id === emptyAnswers[0].id);
            setActiveStep(index)
            setShowError(true);
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
                <Typography color={ showError ? 'red': 'black'}>Please fill the fields for final result.</Typography>
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