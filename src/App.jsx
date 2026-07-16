import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './pages/DashboardLayout';
import UsersView from './pages/UsersView';
import TicketsView from './pages/TicketsView'; // <-- Importar la nueva vista
import PrivateRoute from './components/atoms/PrivateRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                
                {/* Rutas Protegidas */}
                <Route path="/" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
                    <Route index element={<Navigate to="/tickets" replace />} /> {/* Redirigir por defecto a tickets */}
                    <Route path="users" element={<UsersView />} />
                    <Route path="tickets" element={<TicketsView />} /> {/* <-- Nueva ruta agregada */}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;