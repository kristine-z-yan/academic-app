import * as React from 'react';
import {useState} from "react";

import Box from "@mui/material/Box";
import {
    Button, ButtonGroup,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    Input,
    InputLabel,
    ListItem,
    NativeSelect
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ToDoListItem from "../components/ToDoListItem/ToDoListItem";
import {useDispatch, useSelector} from "react-redux";
import { tasksActions } from "../store/tasks-slice";
import Typography from "@mui/material/Typography";

const ToDo = () => {
    const [taskLabel, setTaskLabel] = useState("");
    const [filter, setFilter] = useState('all');
    // const [taskHasError, setTaskHasError] = useState(false);
    const dispatch = useDispatch();

    let todos = useSelector(state => state.todos);
    let taskListItems = 'You don\'t have any tasks';

    let allTasks = todos.all;
    let completedAmount = 0;

    if (allTasks.length > 0 ) {
        let filterBy;
        if (filter !== 'all') {
            if (filter === 'completed') {
                filterBy = true;
            } else {
                filterBy = false;
            }
            allTasks = allTasks.filter((task) => task.completed === filterBy)

        }
        taskListItems = allTasks.map( (task) => {
            if(task.completed) completedAmount++;
            return (
                <ToDoListItem text={task.text} completed={task.completed} key={`task-`+ task.id} id={task.id} />
            )
        })
    }

    const changeInputHandler = (event) => {
        if (event.target.value !== '') {
            setTaskLabel(event.target.value);
        }
    }

    const submitTaskHandler = () => {
        if (taskLabel !== '') {
            const task = {
                text: taskLabel,
                completed: false,
                id: Math.floor(Math.random()*100),
            }
            dispatch(tasksActions.add(task));
            setTaskLabel('');
        }
        // else {
        //     setTaskHasError(true)
        // }
    }

    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.charCode === 13) {
            submitTaskHandler();
        }
    };

    const deleteAllHandler = () => {
        dispatch(tasksActions.deleteAll())
    }

    const completeAllHandler = () => {
        dispatch(tasksActions.completeAll())
    }

    const filterTasksHandler = (el) => {
        // dispatch(tasksActions.filter(el.target.value));
        setFilter(el.target.value);

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
                               <Input id="todo-input" sx={{ width: '75%', marginRight: 2 }} value={taskLabel} onChange={changeInputHandler}  onKeyPress={handleKeypress}/>
                               <Button variant="contained" sx={{ width: '20%' }} onClick={submitTaskHandler}>Add</Button>
                               {/*{ taskHasError && <FormHelperText id="todo-helper-text" sx={{color: 'red'}}>Please, fill this field.</FormHelperText> }*/}
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