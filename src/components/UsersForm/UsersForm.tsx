import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextField from "@mui/material/TextField";
import { Alert, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import StyledPaper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { ToastContainer, toast } from 'react-toastify';

import { UserProps } from '../../models/user'

import {addNewUser, userActions} from "../../store/users-slice";
import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const UsersForm: React.FC = () => {
    const [showToast, setShowToast] = useState(false)
    const firstnameInputRef = useRef<HTMLInputElement>();
    const lastnameInputRef = useRef<HTMLInputElement>();
    const emailInputRef = useRef<HTMLInputElement>();
    const phoneNumberInputRef = useRef<HTMLInputElement>();
    const genderInputRef = useRef<HTMLSelectElement>();

    const dispatch = useDispatch<Dispatch<any>>();
    let data = useSelector((state:RootState) => state.users);

    useEffect(() => {
        console.log(data.showToast);
        if(data.showToast) {
          setShowToast(true);
          toast.success("User added successfully!");
        }

        let timer = setTimeout(() => {
            setShowToast(false);
            dispatch(userActions.changeShowToastToFalse())
        }, 5000)
        return () => clearTimeout(timer)
    }, [data.showToast, dispatch])

    const submitFormHandler = (event: React.FormEvent) => {
        event.preventDefault()

        const enteredFirstname = firstnameInputRef.current?.value;
        const enteredLastname = lastnameInputRef.current?.value;
        const enteredEmail = emailInputRef.current?.value;
        const enteredPhoneNumber = phoneNumberInputRef.current?.value;
        const selectedGender = genderInputRef.current?.value;

        const user: UserProps = {
            firstname: enteredFirstname,
            lastname: enteredLastname,
            email: enteredEmail,
            phoneNumber: enteredPhoneNumber,
            gender: selectedGender,
        }

        dispatch(addNewUser(user));

        (event.target as HTMLFormElement).reset()
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
                                fullWidth
                                id="firstname"
                                label="First Name"
                                sx={{ padding: 1 }}
                                inputRef={firstnameInputRef}
                            />
                            <TextField
                                required
                                fullWidth
                                id="lastname"
                                label="Last Name"
                                sx={{ padding: 1 }}
                                inputRef={lastnameInputRef}
                            />
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                sx={{ padding: 1 }}
                                inputRef={emailInputRef}
                            />
                            <TextField
                                required
                                id="phone-number"
                                label="Phone Number"
                                fullWidth
                                sx={{ padding: 1 }}
                                inputRef={phoneNumberInputRef}
                            />
                            <FormControl fullWidth sx={{ padding: 1 }}>
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Gender"
                                    defaultValue="default"
                                    inputRef={genderInputRef}
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