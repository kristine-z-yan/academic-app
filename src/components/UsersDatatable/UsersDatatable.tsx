import * as React from 'react';
import {SyntheticEvent, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {deleteUser, fetchUsers, getSingleUser} from "../../store/users-slice";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {RootState} from "../../store";
import {Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, SelectChangeEvent} from "@mui/material";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditIcon from '@mui/icons-material/Edit';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {UserProps} from "../../models/user";

interface Column {
    id: 'firstname' | 'lastname' | 'email' | 'phoneNumber' | 'gender' ;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    // { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'firstname', label: 'Firstname', minWidth: 120 },
    { id: 'lastname', label: 'Lastname', minWidth: 120 },
    { id: 'email', label: 'Email', minWidth: 200 },
    { id: 'phoneNumber', label: 'Phone Number', minWidth: 150 },
    { id: 'gender', label: 'Gender', minWidth: 100 },
];

const style = {
    position: 'fixed',
    top: '20vh',
    left: '25%',
    width: '50%',
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '14px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
    zIndex: '30',
    animation: 'slide-down 300ms ease-out forwards',
};

const UsersDatatable: React. FC = () => {
    const [page, setPage] = React.useState(0);
    const [userData, setUserData] = React.useState<UserProps>({
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        gender: '',
        name: '',
    });
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openModal, setOpenModal] = React.useState(false);
    const dispatch = useDispatch<Dispatch<any>>();
    let data = useSelector((state:RootState) => state.users);
    let users = data.all;
    let user = data.user;
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch])

    useEffect(() => {
        setUserData(user)
    }, [user])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const closeModalHandle = () => setOpenModal(false);

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const openEditUserModal = (key: string) => {
        dispatch(getSingleUser(key))
        setOpenModal(true)
    }

    const deleteUserHandle = (key: string) => {
        if(window.confirm('Are you sure wanted to delete the user ?')) {
            dispatch(deleteUser(key))
        }
    }

    const userIdsArray = users ? Object.keys(users) : [];

    const tableBody = userIdsArray.length > 0 ? userIdsArray.map( (key, id) => {
        return (
            <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                 {columns.map((column) => {
                    // @ts-ignore
                     const value = users[key][column.id];
                    return (
                        <TableCell key={column.id} align={column.align}>
                             {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                        </TableCell>
                    );
                })}
                <TableCell>
                  <Button variant="text" color="warning" sx={{ marginRight: '10px' }} onClick={() => openEditUserModal(key)}><EditIcon color="warning"/></Button>
                  <Button variant="text" color="error" onClick={() => deleteUserHandle(key)}><DeleteForeverOutlinedIcon color="error"/></Button>
                </TableCell>
            </TableRow>
        );
    }) :  <TableRow><TableCell align="center" colSpan={6}>Users not found</TableCell></TableRow>

    const handleInputChange = (event: React.ChangeEvent) => {
        // console.log(event.target.value, event.target.name);
    }

    const submitEditFormHandler = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(11111)
    }

    return (
        <Box>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 600 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { tableBody }
                        </TableBody>
                    </Table>
                </TableContainer>
                {userIdsArray.length > 0 && <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={userIdsArray.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> }
            </Paper>
            <Modal
                open={openModal}
                onClose={closeModalHandle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={submitEditFormHandler}>
                        <Grid item sx={{ m: 1, p: 2}} xs={8}>
                            <TextField
                                required
                                fullWidth
                                id="firstname"
                                name="firstname"
                                value={userData.firstname || ""}
                                label="First Name"
                                sx={{ padding: 1 }}
                                onChange={handleInputChange}
                            />
                            <TextField
                                required
                                fullWidth
                                id="lastname"
                                name="lastname"
                                value={userData.lastname || ""}
                                label="Last Name"
                                sx={{ padding: 1 }}
                                onChange={handleInputChange}
                            />
                            <TextField
                                required
                                fullWidth
                                id="email"
                                name="email"
                                value={userData.email || ""}
                                label="Email"
                                sx={{ padding: 1 }}
                                onChange={handleInputChange}
                            />
                            <TextField
                                required
                                id="phone-number"
                                name="phoneNumber"
                                label="Phone Number"
                                value={userData.phoneNumber || ""}
                                fullWidth
                                sx={{ padding: 1 }}
                                onChange={handleInputChange}
                            />
                            <FormControl fullWidth sx={{ padding: 1 }}>
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                    labelId="gender"
                                    id="gender"
                                    label="Gender"
                                    name="gender"
                                    defaultValue="default"
                                    value={userData.gender || "default"}
                                    // onChange={handleInputChange}
                                >
                                    <MenuItem value="default" disabled>Select</MenuItem>
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                </Select>
                            </FormControl>
                            <Button sx={{ margin: 1}} type="submit" variant="contained" color="success">Edit</Button>
                            <Button sx={{ margin: 1}} type="button" variant="contained" color="secondary" onClick={closeModalHandle}>Cancel</Button>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </Box>
    );
}

export default UsersDatatable
