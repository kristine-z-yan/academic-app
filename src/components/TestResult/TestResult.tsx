import * as React from 'react';

import {Button, Chip, Divider, Grid, ListItem} from "@mui/material";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import questions from "../questions";

const TestResult: React.FC = () => {
    const listItems = questions.map( (item, index) => {
        return (
            <ListItem key={index}>
                <ListItemText
                    primary={
                        <React.Fragment>
                            { item.label }
                            <Chip label="Right" color="success" variant="filled" sx={{ marginLeft: '15px'}} />
                        </React.Fragment>
                    }
                    secondary={
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
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body1"
                                    color="text.primary"
                                >
                                    {item.rightAnswer}
                                </Typography>
                            </Grid>
                            <Grid>
                                Right answer -
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body1"
                                    color="text.primary"
                                >
                                    {item.rightAnswer}
                                </Typography>
                            </Grid>
                            {/*<Divider />*/}
                        </React.Fragment>
                    }
                />
            </ListItem>
        )
    })
    return (
        <Grid item xs={6} sx={{border: '2px solid #fff'}}>
           <Paper>
              <List >
                  {listItems}
              </List>
               <Button sx={{ margin: '15px'}} variant="contained">Try Again</Button>
           </Paper>
        </Grid>
    )
}

export default TestResult;