import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Checkbox,
  TablePagination,
  Box,
  TableHead,
  TableSortLabel,
  Toolbar,
  Tooltip,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from '../types';

interface UserTableProps {
  users: User[];
  order: 'asc' | 'desc';
  orderBy: keyof User;
  setOrder: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>;
  setOrderBy: React.Dispatch<React.SetStateAction<keyof User>>;
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  rowsPerPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  handleDeleteSelected: () => void;
}

const UserTable: React.FC<UserTableProps> = ( {
  users, order, orderBy, setOrder, setOrderBy, selected, setSelected, rowsPerPage, page, setPage, setRowsPerPage, handleDeleteSelected
} ) => {
  const isSelected = ( id: number ) => selected.indexOf( id ) !== -1;

  const handleRequestSort = ( property: keyof User ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder( isAsc ? 'desc' : 'asc' );
    setOrderBy( property );
  };

  const handleSelectAllClick = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    if ( event.target.checked ) {
      const newSelected = users.map( ( user ) => user.id );
      setSelected( newSelected );
      return;
    }
    setSelected( [] );
  };

  const handleClick = ( id: number ) => {
    const selectedIndex = selected.indexOf( id );
    let newSelected: number[] = [];

    if ( selectedIndex === -1 ) {
      newSelected = newSelected.concat( selected, id );
    } else if ( selectedIndex === 0 ) {
      newSelected = newSelected.concat( selected.slice( 1 ) );
    } else if ( selectedIndex === selected.length - 1 ) {
      newSelected = newSelected.concat( selected.slice( 0, -1 ) );
    } else if ( selectedIndex > 0 ) {
      newSelected = newSelected.concat( selected.slice( 0, selectedIndex ), selected.slice( selectedIndex + 1 ) );
    }
    setSelected( newSelected );
  };

  return (
    <Box sx={ { width: '100%', mt: 3 } }>
      <Paper sx={ { width: '100%', mb: 2 } }>
        <Toolbar>
          { selected.length > 0 ? (
            <Tooltip title="Eliminar">
              <IconButton onClick={ handleDeleteSelected }>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : null }
        </Toolbar>

        <TableContainer>
          <Table sx={ { minWidth: 750 } } aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={ selected.length > 0 && selected.length < users.length }
                    checked={ users.length > 0 && selected.length === users.length }
                    onChange={ handleSelectAllClick }
                  />
                </TableCell>
                { [ 'name', 'username', 'email', 'phone', 'city', 'company' ].map( ( key ) => (
                  <TableCell key={ key }>
                    <TableSortLabel
                      active={ orderBy === key }
                      direction={ orderBy === key ? order : 'asc' }
                      onClick={ () => handleRequestSort( key as keyof User ) }
                    >
                      { key.toUpperCase() }
                    </TableSortLabel>
                  </TableCell>
                ) ) }
              </TableRow>
            </TableHead>
            <TableBody>
              { users.map( ( user ) => {
                const isItemSelected = isSelected( user.id );
                return (
                  <TableRow
                    key={ user.id }
                    selected={ isItemSelected }
                    onClick={ () => handleClick( user.id ) }
                    role="checkbox"
                    aria-checked={ isItemSelected }
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={ isItemSelected }
                        inputProps={ {
                          'aria-labelledby': `user-${ user.id }`,
                        } }
                      />
                    </TableCell>
                    <TableCell>{ user.name }</TableCell>
                    <TableCell>{ user.username }</TableCell>
                    <TableCell>{ user.email }</TableCell>
                    <TableCell>{ user.phone }</TableCell>
                    <TableCell>{ user.address.city }</TableCell>
                    <TableCell>{ user.company.name }</TableCell>
                  </TableRow>
                );
              } ) }
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={ [ 5, 10, 25 ] }
          component="div"
          count={ users.length }
          rowsPerPage={ rowsPerPage }
          page={ page }
          onPageChange={ ( e, newPage ) => setPage( newPage ) }
          onRowsPerPageChange={ ( e ) => setRowsPerPage( parseInt( e.target.value, 10 ) ) }
        />
      </Paper>
    </Box>
  );
};

export default UserTable;
