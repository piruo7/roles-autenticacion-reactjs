import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import PrivateRoute from './routes/PrivateRoute';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';

type Role = 'user' | 'admin';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={ [ 'user', 'admin' ] as Role[] }>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={ [ 'admin' ] as Role[] }>
              <AdminPanel />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
