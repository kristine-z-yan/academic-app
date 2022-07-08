import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextField from "@mui/material/TextField";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import StyledPaper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { ToastContainer, toast } from 'react-toastify';

import { UserProps } from '../../models/user'

import {addNewUser} from "../../store/users-slice";
import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const UsersForm: React.FC = () => {
    const [showToast, setShowToast] = useState(false)
    const [ formState, setFormState ] = useState<UserProps>({} as UserProps)
    const dispatch = useDispatch<Dispatch<any>>();
    let data = useSelector((state:RootState) => state.users);

    useEffect(() => {
        if(data.showToast) {
          setShowToast(true);
          toast.success("User added successfully!");
        }
    }, [data.showToast, dispatch])

    const submitFormHandler = (event: React.FormEvent) => {
        event.preventDefault()
        dispatch(addNewUser(formState));
        (event.target as HTMLFormElement).reset()
    }

    const handleChange = (value: string, name: string) => {
        setFormState({
            ...formState,
            [name]: value
        })
    }

    return (
        <Box sx={{ flexGrow: 1}}>
            { showToast &&  <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />}
            <StyledPaper>
                <Grid container wrap="nowrap" spacing={2} sx={{ margin: 1}}>
                    <form onSubmit={submitFormHandler}>
                        <Grid item sx={{ m: 1, p: 2}} xs={8}>
                            <TextField
                                required
                                name="firstname"
                                fullWidth
                                id="firstname"
                                label="First Name"
                                sx={{ padding: 1 }}
                                onChange={(e) => handleChange(e.target.value, e.target.name)}
                            />
                            <TextField
                                required
                                fullWidth
                                name="lastname"
                                id="lastname"
                                label="Last Name"
                                sx={{ padding: 1 }}
                                onChange={(e) => handleChange(e.target.value, e.target.name)}
                            />
                            <TextField
                                required
                                fullWidth
                                name="email"
                                id="email"
                                label="Email"
                                sx={{ padding: 1 }}
                                onChange={(e) => handleChange(e.target.value, e.target.name)}
                            />
                            <TextField
                                required
                                name="phoneNumber"
                                id="phone-number"
                                label="Phone Number"
                                fullWidth
                                sx={{ padding: 1 }}
                                onChange={(e) => handleChange(e.target.value, e.target.name)}
                            />
                            <FormControl fullWidth sx={{ padding: 1 }}>
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Gender"
                                    name="gender"
                                    defaultValue="default"
                                    onChange={(e) => handleChange(e.target.value, e.target.name)}
                                >
                                    <MenuItem value="default" disabled>Select</MenuItem>
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                </Select>
                            </FormControl>
                            <Button sx={{ margin: 1}} type="submit" variant="contained" color="success">Create</Button>
                        </Grid>
                    </form>
                </Grid>
            </StyledPaper>
        </Box>
    )
}

export default UsersForm;