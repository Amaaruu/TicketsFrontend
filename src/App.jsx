import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './pages/DashboardLayout';
import UsersView from './pages/UsersView';
import PrivateRoute from './components/atoms/PrivateRoute';

const DashboardIndex = () => {
  return <Navigate to="/dashboard/usuarios" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
          <Route index element={<DashboardIndex />} />
          <Route path="usuarios" element={<UsersView />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;