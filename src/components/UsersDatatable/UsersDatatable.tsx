import * as React from 'react';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {deleteUser, fetchUsers} from "../../store/users-slice";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {RootState} from "../../store";
import {Button} from "@mui/material";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditIcon from '@mui/icons-material/Edit';

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

const UsersDatatable: React. FC = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const dispatch = useDispatch<Dispatch<any>>();
    let users = useSelector((state:RootState) => state.users.all);
    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const openEditUserModal = (key: string) => {
        console.log(key)
    }

    const deleteUserHandle = (key: string) => {
        if(window.confirm('Are you sure wanted to delete the user ?')) {
            dispatch(deleteUser(key))
        }
    }

    const userIdsArray = users ? Object.keys(users) : [];

    const tableBody = userIdsArray.length > 10 ? userIdsArray.map( (key, id) => {
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

    return (
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
    );
}

export default UsersDatatable
