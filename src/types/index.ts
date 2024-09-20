export interface Post {
  id: number | string;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
}

export interface HeadCell {
  id: keyof User;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
}


export const headCells: HeadCell[] = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nombre' },
  { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'phone', numeric: false, disablePadding: false, label: 'Teléfono' },
  { id: 'address', numeric: false, disablePadding: false, label: 'Ciudad' },
  { id: 'company', numeric: false, disablePadding: false, label: 'Compañía' },
];

export interface EnhancedTableHeadProps {
  numSelected: number;
  order: 'asc' | 'desc';
  orderBy: keyof User;
  rowCount: number;
  onRequestSort: ( event: React.MouseEvent<unknown>, property: keyof User ) => void;
  onSelectAllClick: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
}