import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './pages/DashboardLayout';
import UsersView from './pages/UsersView';
import TicketsView from './pages/TicketsView';
import PrivateRoute from './components/atoms/PrivateRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                
                <Route path="/" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
                    <Route index element={<Navigate to="/tickets" replace />} />
                    <Route path="users" element={<UsersView />} />
                    <Route path="tickets" element={<TicketsView />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;