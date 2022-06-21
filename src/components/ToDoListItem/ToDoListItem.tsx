import * as React from 'react';
import { useDispatch } from "react-redux";

import { tasksActions } from '../../store/tasks-slice';

import {IconButton, ListItem} from "@mui/material";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import Task from "../../models/task";

const ToDoListItem: React.FC<Task> = (props) => {
    const dispatch = useDispatch();

    const completeTaskHandler = (id: number) => {
        dispatch(tasksActions.complete(id));
    };

    const deleteTaskHandler = (id: number) => {
        dispatch(tasksActions.delete(id));
    }

    return (
        <ListItem id={'task-' + props.id}>
            <ListItemButton role={undefined} onClick={() => completeTaskHandler(props.id)} dense>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={props.completed}
                        tabIndex={-1}
                        disableRipple
                    />
                </ListItemIcon>
                <ListItemText  primary={props.text} />
            </ListItemButton>
            <IconButton edge="end" aria-label="delete" onClick={() => deleteTaskHandler(props.id)}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}

export default ToDoListItem;