import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import FormField from '../molecules/FormField';
import ButtonCustom from '../atoms/ButtonCustom';
import axiosInstance from '../../api/axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/auth/login', { email, password });
            login(response.data.token);
            navigate('/tickets');
        } catch (err) {
            setError('Credenciales inválidas');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Iniciar Sesión</h2>
            {error && <p className="error-message">{error}</p>}
            <FormField 
                label="Correo Electrónico" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
            <FormField 
                label="Contraseña" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
            <ButtonCustom type="submit" text="Ingresar" />
        </form>
    );
};

export default LoginForm;