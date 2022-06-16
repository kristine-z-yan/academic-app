import * as React from 'react';
import {useState} from "react";

import Box from "@mui/material/Box";
import {Button, FormHelperText, Grid, Input, InputLabel, ListItem} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ToDoListItem from "../components/ToDoListItem/ToDoListItem";
import {useDispatch, useSelector} from "react-redux";
import { tasksActions } from "../store/tasks-slice";

const ToDo = () => {
    const [taskName, setTaskName] = useState("");
    const dispatch = useDispatch();

    let todos = useSelector(state => state.todos);
    let taskListItems = 'You don\'t have any tasks';

    if ( todos.tasks.length > 0 ) {
        taskListItems = todos.tasks.map( (task, index) => {
            return (
                <ToDoListItem text={task.text} completed={task.completed} key={`task-`+ index++}/>
            )
        })
    }

    const changeInputHandler = (event) => {
        setTaskName(event.target.value);
    }

    const submitTaskHandler = () => {
        const task = {
            text: taskName,
            completed: false
        }
        dispatch(tasksActions.add(task));
        setTaskName('')
    }

    return (
        <Box  sx={{ width: '100%', height: '100vh' }}>
            <Grid>
                <h1>To Do List</h1>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item xs={6}>
                   <Card>
                       <CardContent>
                           {/*<TextField id="standard-basic" label="My new task is" variant="standard" sx={{ width: '80%'}}/>*/}
                           <Grid sx={{ width: '100%' }} justify-content='center'>
                               <InputLabel htmlFor="todo-input">My new task is </InputLabel>
                               <Input id="todo-input" sx={{ width: '75%', marginRight: 2 }} value={taskName} onChange={changeInputHandler}/>
                               {/*<FormHelperText id="todo-helper-text">Please, fill this field.</FormHelperText>*/}
                               <Button variant="contained" sx={{ width: '20%' }} onClick={submitTaskHandler}>Add</Button>
                           </Grid>
                           <Grid sx={{ width: '95%' }}>
                              <List>
                                  { taskListItems }
                              </List>
                           </Grid>
                       </CardContent>
                   </Card>
                </Grid>
            </Grid>
        </Box>
    )
};

export default ToDo;