import * as React from 'react';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {deleteUser, editUser, fetchUsers} from "../../store/users-slice";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {RootState} from "../../store";
import {
    Button,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Select
} from "@mui/material";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditIcon from '@mui/icons-material/Edit';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {UserProps} from "../../models/user";
import Typography from "@mui/material/Typography";

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

const initialUserData = {
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    gender: 'default',
    name: '',
}

const UsersDatatable: React. FC = () => {
    const [page, setPage] = React.useState(0);
    const [userData, setUserData] = React.useState<UserProps>(initialUserData);
    const [userKey, setUserKey] = React.useState("");
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openModal, setOpenModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const dispatch = useDispatch<Dispatch<any>>();
    let data = useSelector((state:RootState) => state.users);
    let users = data.all;
    const userIdsArray = users ? Object.keys(users) : [];
    const user: UserProps = data.user;

    useEffect(() => {
        dispatch(fetchUsers());
    }, [])

    useEffect(() => {
        setUserData(user)
    }, [user])

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
                  <Button variant="text" color="error" onClick={() => showDeleteModal(key)}><DeleteForeverOutlinedIcon color="error"/></Button>
                </TableCell>
            </TableRow>
        );
    }) :  <TableRow><TableCell align="center" colSpan={6}>Users not found</TableCell></TableRow>

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const closeEditModalHandle = () => {
        setOpenModal(false);
        setUserData(initialUserData)
    }

    const closeDeleteModalHandle = () => {
        setOpenDeleteModal(false);
        setUserKey('');
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const openEditUserModal = (key: string) => {
        // @ts-ignore
        setUserData(users[key])
        setOpenModal(true)
    }

    const showDeleteModal = (key: string) => {
        setOpenDeleteModal(true);
        setUserKey(key);
    }

    const deleteUserHandle = () => {
        dispatch(deleteUser(userKey))
        setOpenDeleteModal(false);
    }

    const handleInputChange = (name: string, value: string | number) => {
        setUserData({...userData, [name]: value })
    }

    const submitEditFormHandler = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(editUser(userData))
        closeEditModalHandle()
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
                onClose={closeEditModalHandle}
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
                                onChange={e=>handleInputChange(e.target.name, e.target.value)}
                            />
                            <TextField
                                required
                                fullWidth
                                id="lastname"
                                name="lastname"
                                value={userData.lastname || ""}
                                label="Last Name"
                                sx={{ padding: 1 }}
                                onChange={e=>handleInputChange(e.target.name, e.target.value)}
                            />
                            <TextField
                                required
                                fullWidth
                                id="email"
                                name="email"
                                value={userData.email || ""}
                                label="Email"
                                sx={{ padding: 1 }}
                                onChange={e=>handleInputChange(e.target.name, e.target.value)}
                            />
                            <TextField
                                required
                                id="phone-number"
                                name="phoneNumber"
                                label="Phone Number"
                                value={userData.phoneNumber || ""}
                                fullWidth
                                sx={{ padding: 1 }}
                                onChange={e=>handleInputChange(e.target.name, e.target.value)}
                            />
                            <FormControl fullWidth sx={{ padding: 1 }}>
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                    labelId="gender"
                                    id="gender"
                                    label="Gender"
                                    name="gender"
                                    value={userData.gender || "default"}
                                    onChange={e=>handleInputChange(e.target.name, e.target.value)}
                                >
                                    <MenuItem value="default" disabled>Select</MenuItem>
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                </Select>
                            </FormControl>
                            <Button sx={{ margin: 1}} type="submit" variant="contained" color="success">Edit</Button>
                            <Button sx={{ margin: 1}} type="button" variant="contained" color="secondary" onClick={closeEditModalHandle}>Cancel</Button>
                        </Grid>
                    </form>
                </Box>
            </Modal>

            <Dialog
                open={openDeleteModal}
                onClose={closeDeleteModalHandle}
                // PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Delete user
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       Are you sure wanted to delete the user ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteModalHandle} variant="contained" color="secondary">Cancel</Button>
                    <Button onClick={deleteUserHandle} variant="contained" color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default UsersDatatable
