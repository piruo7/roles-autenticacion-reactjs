import React, { useState } from 'react';
import {
  Button,
  TextField,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Tooltip,
  IconButton,
  Box,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import { setAuth } from '../redux/authSlice';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface User {
  id: number;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

const users: User[] = [
  { id: 1, email: 'admin@mail.com', password: 'admin123', role: 'admin' },
  { id: 2, email: 'user@mail.com', password: 'user123', role: 'user' },
];

const Login: React.FC = () => {
  const [ email, setEmail ] = useState<string>( '' );
  const [ password, setPassword ] = useState<string>( '' );
  const [ error, setError ] = useState<string | null>( null );
  const [ tooltipText, setTooltipText ] = useState<string>( 'Copiar' );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    setError( null );

    try {
      const data = await login( email, password );
      const { token, role } = data;

      dispatch( setAuth( { token, role } ) );
      navigate( '/dashboard' );
    } catch ( err ) {
      setError( 'Login failed: Invalid credentials' );
    }
  };

  const handleCopy = ( text: string ) => {
    navigator.clipboard.writeText( text );
    setTooltipText( 'Copiado' );
    setTimeout( () => setTooltipText( 'Copiar' ), 1500 );
  };

  return (
    <Container
      maxWidth="sm"
      sx={ {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f4f7',
        borderRadius: 2,
        boxShadow: 3,
        padding: 4,
      } }
    >
      <Box
        sx={ {
          marginBottom: 4,
          textAlign: 'center',
        } }
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Iniciar Sesión
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Introduce tus credenciales para acceder
        </Typography>
      </Box>
      <form onSubmit={ handleSubmit }>
        <TextField
          fullWidth
          label="Email"
          value={ email }
          onChange={ ( e ) => setEmail( e.target.value ) }
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={ password }
          onChange={ ( e ) => setPassword( e.target.value ) }
          margin="normal"
          variant="outlined"
        />
        { error && (
          <Typography color="error" variant="body2" sx={ { marginTop: 1 } }>
            { error }
          </Typography>
        ) }
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={ { marginTop: 3, padding: 1 } }
        >
          Login
        </Button>
      </form>

      <Box sx={ { marginTop: 5 } }>
        <Typography variant="h6" gutterBottom>
          Usuarios Disponibles
        </Typography>
        <TableContainer component={ Paper }>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { users.map( ( user ) => (
                <TableRow key={ user.id }>
                  <TableCell>{ user.id }</TableCell>
                  <TableCell>
                    <Tooltip title={ tooltipText } arrow>
                      <span>
                        { user.email }
                        <IconButton
                          size="small"
                          onClick={ () => handleCopy( user.email ) }
                          sx={ { marginLeft: 1 } }
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip title={ tooltipText } arrow>
                      <span>
                        { user.password }
                        <IconButton
                          size="small"
                          onClick={ () => handleCopy( user.password ) }
                          sx={ { marginLeft: 1 } }
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{ user.role }</TableCell>
                </TableRow>
              ) ) }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Login;
