import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Grid, Typography, Button, Paper, Snackbar, Alert } from '@mui/material'
import UserItem from './UserItem';
import UserForm from './UserForm';

function UserList() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/users");
            setUsers(response.data);
        } catch (error) {
            console.log('Error fetching users:', error);
            showSnackbar('Error fetching users', 'error');
        }
    }

    const addUser = async (user) => {
        try {
            const response = await axios.post(`https://jsonplaceholder.typicode.com/users/`, user);
            setUsers([...users, response.data]);
            setEditingUser(null);
            showSnackbar('User added successfully', 'success');
        } catch (error) {
            console.log('Error adding users:', error);
            showSnackbar('Error adding users', 'error');
        }
    }

    const updateUser = async (user) => {
        try {
            await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
            setUsers(users.map((u) => (u.id === user.id ? user : u)));
            setEditingUser(null);
            showSnackbar('User updated successfully', 'success');
        } catch (error) {
            console.log('Error updating users:', error);
            showSnackbar('Error updating users', 'error');
        }
    }

    const deleteUser = async (id) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            setUsers(users.filter((user) => user.id !== id));
            showSnackbar('User deleted Successfully', 'success');
        } catch (error) {
            console.log('Error deleting users:', error);
            showSnackbar('Error deleting users', 'error');
        }
    }

    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    }

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false })
    }
    return (
        <Container >
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px',backgroundColor:'lightblue' }}>
                <Typography style={{color:'darkblue',textAlign:'center',fontWeight:'bolder'}} variant='h3' gutterBottom>USER MANAGEMENT</Typography> <hr /> 
                <Button variant="contained"  style={{ margin: '5px 0px 20px 0px',color:'black',backgroundColor:'blue',fontWeight:'bolder' }}
                    onClick={() => setEditingUser({})}>Add user</Button>
                <Grid container spacing={3}>
                    {users.map((user) => (
                        <UserItem 
                            key={user.id}
                            user={user}
                            onEdit={setEditingUser}
                            onDelete={deleteUser}>

                        </UserItem>
                    ))}
                </Grid>
                
                {editingUser && (
                    <UserForm
                        user={editingUser}
                        onSave={editingUser.id ? updateUser : addUser}
                        onCancel={() => setEditingUser(null)}
                    />
                )}
            </Paper>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity}
                    sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default UserList



