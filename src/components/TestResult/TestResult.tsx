import * as React from 'react';

import {Button, Chip, Divider, Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import Answer from '../../models/answer';
import questions from "../questions";

const TestResult: React.FC<{ answers: Answer[], onReset: (reset: boolean) => void }> = (props) => {
    const onResetHandler = () => {
        props.onReset(true);
    }
    const listItems = questions.map( (item, index) => {
        return (
            <li key={index} style={{paddingLeft: "20px",marginBottom: "20px"}}>
                <ListItemText
                    primary={
                        <React.Fragment>
                            { item.label }
                            <Chip label={props.answers[index].isCorrect ? "Right": "Wrong"} color={props.answers[index].isCorrect ? "success": "error"} variant="filled" sx={{ marginLeft: '15px'}} />
                        </React.Fragment>
                    }
                />
                <React.Fragment>
                    <Grid margin='10px'>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {item.question}
                        </Typography>
                    </Grid>
                    <Grid>
                        Your answer -
                        <Typography
                            // sx={{ display: 'inline' }}
                            component="span"
                            variant="body1"
                            color="text.primary"
                        >
                            {props.answers[index].answer}
                        </Typography>
                    </Grid>
                    <Grid>
                        Right answer -
                        <Typography
                            // sx={{ display: 'inline' }}
                            component="span"
                            variant="body1"
                            color="text.primary"
                        >
                            {item.rightAnswer}
                        </Typography>
                    </Grid>
                </React.Fragment>
                <Divider sx={{paddingBottom: "10px"}}/>
            </li>
        )
    })
    return (
        <Grid item xs={6} sx={{border: '2px solid #fff'}}>
           <Paper>
              <List>
                  {listItems}
              </List>
               <Button sx={{ margin: '15px'}} variant="contained" onClick={onResetHandler}>Try Again</Button>
           </Paper>
        </Grid>
    )
}

export default TestResult;