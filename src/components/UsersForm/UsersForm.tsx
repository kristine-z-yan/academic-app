import * as React from "react";
import {useRef} from "react";

import TextField from "@mui/material/TextField";
import {Grid} from "@mui/material";
import StyledPaper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const UsersForm: React.FC = () => {
    const firstnameInputRef = useRef<HTMLInputElement>();
    const lastnameInputRef = useRef<HTMLInputElement>();
    const emailInputRef = useRef<HTMLInputElement>();

    const submitFormHandler: React.FormEventHandler = (event) => {
        event.preventDefault()
        const enteredFirstname = firstnameInputRef.current?.value;
        const enteredLastname = lastnameInputRef.current?.value;
        const enteredEmail = emailInputRef.current?.value;

        console.log(enteredFirstname, enteredLastname, enteredEmail);
    }

    return (
        <Box sx={{ flexGrow: 1}}>
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
                            <Button sx={{ margin: 1}} type="submit" variant="contained" color="success">Create</Button>
                        </Grid>
                    </form>
                </Grid>
            </StyledPaper>
        </Box>

        // <Grid container>
        //     <Grid item xs={6}>
        //         <Paper sx={{padding: '20px'}}>
        //             <form onSubmit={submitFormHandler}>
        //                 <TextField
        //                     required
        //                     fullWidth
        //                     id="firstname"
        //                     label="First Name"
        //                 />
        //                 <TextField
        //                     required
        //                     fullWidth
        //                     id="lastname"
        //                     label="First Name"
        //                 />
        //                 <TextField
        //                     required
        //                     fullWidth
        //                     id="address"
        //                     label="Address"
        //                 />
        //             </form>
        //         </Paper>
        //     </Grid>
        // </Grid>
    )
}

export default UsersForm;