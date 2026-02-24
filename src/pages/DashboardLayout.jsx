import { Outlet } from 'react-router-dom';
import MainLayout from '../components/templates/MainLayout';
import { useAuthStore } from '../store/useAuthStore';

const DashboardLayout = () => {
  const { user, logout } = useAuthStore();

  return (
    <MainLayout user={user} onLogout={logout}>
       {/* Outlet es mágico: aquí se inyectarán las páginas hijas (Tickets, Crear, Usuarios) */}
      <Outlet /> 
    </MainLayout>
  );
};

export default DashboardLayout;