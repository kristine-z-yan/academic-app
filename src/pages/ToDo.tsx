import * as React from 'react';
import { useState } from "react";

import Box from "@mui/material/Box";
import {
    Button, ButtonGroup,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    Input,
    InputLabel,
    NativeSelect
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ToDoListItem from "../components/ToDoListItem/ToDoListItem";
import {useDispatch, useSelector} from "react-redux";
import { tasksActions } from "../store/tasks-slice";
import Typography from "@mui/material/Typography";
import {RootState} from "../store";
import Task from "../models/task";

const ToDo = () => {
    const [filter, setFilter] = useState('all');
    const [isTouched, setIsTouched] = useState(false);
    const [taskLabel, setTaskLabel] = useState("");
    let todos = useSelector((state:RootState) => state.todos);
    let taskListItems: any[] = [];

    const dispatch = useDispatch();

    let allTasks: Task[] = todos.all;
    let completedAmount = 0;

    if (allTasks.length > 0 ) {
        let filterBy: boolean;
        if (filter !== 'all') {
            filterBy = filter === 'completed';
            allTasks = allTasks.filter((task: Task) => task.completed === filterBy)

        }
        taskListItems = allTasks.map( (task) => {
            if(task.completed) completedAmount++;
            return (
                <ToDoListItem text={task.text} completed={task.completed} key={`task-`+ task.id} id={task.id} />
            )
        })
    }

    const valueIsValid = taskLabel.trim() !== '';
    const inputHasError = !valueIsValid && isTouched;

    const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskLabel(event.currentTarget.value);
    }

    const inputBlurHandler = () => {
        setIsTouched(true);
    };

    const submitTaskHandler = () => {
        if (valueIsValid) {
            dispatch(tasksActions.add(taskLabel));
            setTaskLabel('');
            setIsTouched(false);
        }
    }

    const handleKeypress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        //it triggers by pressing the enter key
        if (e.key === "Enter") {
            submitTaskHandler();
        }
    };

    const deleteAllHandler = () => {
        dispatch(tasksActions.deleteAll())
    }

    const completeAllHandler = () => {
        dispatch(tasksActions.completeAll())
    }

    const filterTasksHandler = (el: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(el.currentTarget.value);
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
                           <Typography variant="h4" sx={{marginBottom: 1}}>
                               Left {allTasks.length - completedAmount} / {allTasks.length}
                           </Typography>
                           <Grid sx={{marginBottom: 2}} container justifyContent='space-between' alignItems='center'>
                              <ButtonGroup>
                                  <Button variant='contained' onClick={completeAllHandler} sx={{marginRight: 1}}>Complete All</Button>
                                  <Button variant='contained' onClick={deleteAllHandler}  sx={{marginRight: 1}}>Delete All</Button>
                              </ButtonGroup>
                               <FormControl>
                                   <InputLabel variant="standard" htmlFor="task-filter">
                                       Show
                                   </InputLabel>
                                   <NativeSelect
                                       defaultValue={'all'}
                                       inputProps={{
                                           name: 'filter',
                                           id: 'task-filter',
                                       }}
                                       onChange={filterTasksHandler}
                                   >
                                       <option value={'all'}>All</option>
                                       <option value={'completed'}>Completed</option>
                                       <option value={'not-completed'}>Not Completed</option>
                                   </NativeSelect>
                               </FormControl>
                           </Grid>
                           <Divider />
                           <Grid sx={{ width: '100%', marginY: 2 }} justify-content='center'>
                               <InputLabel htmlFor="todo-input">My new task is </InputLabel>
                               <Input
                                   id="todo-input"
                                   sx={{ width: '75%', marginRight: 2 }}
                                   value={taskLabel}
                                   onChange={changeInputHandler}
                                   onBlur={inputBlurHandler}
                                   onKeyPress={handleKeypress}/>
                               <Button variant="contained" sx={{ width: '20%' }} onClick={submitTaskHandler}>Add</Button>
                               { inputHasError && <FormHelperText id="todo-helper-text" sx={{color: 'red'}}>Please, fill this field.</FormHelperText> }
                           </Grid>
                           <Grid sx={{ width: '95%' }}>
                              <List>
                                  { taskListItems ?? 'You don\'t have any tasks' }
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