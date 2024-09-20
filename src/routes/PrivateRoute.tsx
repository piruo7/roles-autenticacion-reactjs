import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
}

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ( { children, allowedRoles } ) => {
  const token = localStorage.getItem( 'token' );

  if ( !token ) {
    return <Navigate to="/" />;
  }

  try {
    const decodedToken = jwtDecode<DecodedToken>( token );
    const userRole = decodedToken.role;

    if ( allowedRoles.includes( userRole ) ) {
      return <>{ children }</>;
    } else {
      return <Navigate to="/" />;
    }
  } catch ( error ) {
    console.error( 'Invalid token:', error );
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
