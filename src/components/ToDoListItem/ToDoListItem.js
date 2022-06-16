import * as React from 'react';
import {IconButton, ListItem} from "@mui/material";

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';

const ToDoListItem = (props) => {
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <ListItem>
            <ListItemButton role={undefined} onClick={handleToggle()} dense>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked.indexOf() !== -1}
                        tabIndex={-1}
                        disableRipple
                        // inputProps={{ 'aria-labelledby':  }}
                    />
                </ListItemIcon>
                <ListItemText  primary={props.text} />
                <IconButton edge="end" aria-label="comments">
                    <DeleteIcon />
                </IconButton>
            </ListItemButton>
        </ListItem>
    )
}

export default ToDoListItem;