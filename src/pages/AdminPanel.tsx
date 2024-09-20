import React, { useEffect, useState } from 'react';
import { Container, Box, Paper, Button, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, deleteUser, clearAuth } from '../redux/authSlice';
import axios from 'axios';
import { User } from '../types';
import UserTable from '../components/UserTable';

const AdminPanel: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector( ( state: any ) => state.users.users as User[] );
  const [ order, setOrder ] = useState<'asc' | 'desc'>( 'asc' );
  const [ orderBy, setOrderBy ] = useState<keyof User>( 'name' );
  const [ selected, setSelected ] = useState<number[]>( [] );
  const [ page, setPage ] = useState( 0 );
  const [ rowsPerPage, setRowsPerPage ] = useState( 5 );
  const navigate = useNavigate();

  useEffect( () => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get<User[]>( 'https://jsonplaceholder.typicode.com/users' );
        dispatch( setUsers( res.data ) );
      } catch ( err ) {
        console.error( 'Error fetching users', err );
      }
    };
    fetchUsers();
  }, [ dispatch ] );

  const handleLogout = () => {
    dispatch( clearAuth() );
    navigate( '/' );
  };

  const handleDeleteSelected = () => {
    selected.forEach( ( id ) => {
      dispatch( deleteUser( id ) );
    } );
    setSelected( [] );
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={ { flexGrow: 1 } }>
            Admin Panel
          </Typography>
          <Button color="inherit" onClick={ () => navigate( '/dashboard' ) }>
            Volver al Dashboard
          </Button>
          <IconButton color="inherit" onClick={ handleLogout }>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={ { width: '100%', mt: 3 } }>
        <Paper sx={ { width: '100%', mb: 2 } }>
          <UserTable
            users={ users }
            order={ order }
            orderBy={ orderBy }
            setOrder={ setOrder }
            setOrderBy={ setOrderBy }
            selected={ selected }
            setSelected={ setSelected }
            rowsPerPage={ rowsPerPage }
            page={ page }
            setPage={ setPage }
            setRowsPerPage={ setRowsPerPage }
            handleDeleteSelected={ handleDeleteSelected }
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminPanel;
