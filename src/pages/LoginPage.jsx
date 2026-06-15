import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../api/userService';
import { useAuthStore } from '../store/useAuthStore';
// Importamos tu archivo CSS (verifica que la ruta coincida con tu estructura)
import '../styles/pages/LoginPage.css'; 

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    
    const setUser = useAuthStore(state => state.setUser);
    const setToken = useAuthStore(state => state.setToken);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await loginUsuario(credentials);
            setUser(user);
            setToken(user.username); 
            navigate('/');
        } catch (err) {
            setError('Credenciales inválidas. Intenta nuevamente.');
        }
    };

    return (
        // Contenedor principal centrado
        <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f7fe', fontFamily: 'system-ui, sans-serif' }}>
            
            {/* Aplicamos tu clase .login-card */}
            <div className="login-card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center', boxSizing: 'border-box' }}>
                
                {/* Aplicamos tu clase .login-title */}
                <h2 className="login-title">Acceso al Sistema</h2>
                
                {error && <p style={{ color: '#d32f2f', fontSize: '13px', marginBottom: '20px', fontWeight: '500' }}>{error}</p>}
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                    <input 
                        name="username" 
                        placeholder="Usuario" 
                        onChange={handleChange} 
                        required 
                        style={{ padding: '14px', borderRadius: '10px', border: '1px solid #e0e5f2', outline: 'none', fontSize: '14px' }}
                    />
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="Contraseña" 
                        onChange={handleChange} 
                        required 
                        style={{ padding: '14px', borderRadius: '10px', border: '1px solid #e0e5f2', outline: 'none', fontSize: '14px' }}
                    />
                    <button 
                        type="submit"
                        style={{ 
                            padding: '14px', 
                            borderRadius: '10px', 
                            backgroundColor: '#4318ff', // Combinando con tu título
                            color: 'white', 
                            border: 'none', 
                            fontWeight: '700', 
                            cursor: 'pointer',
                            marginTop: '10px',
                            transition: 'background 0.3s'
                        }}
                    >
                        INGRESAR
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;