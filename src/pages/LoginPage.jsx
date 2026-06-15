import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../api/userService';
import { useAuthStore } from '../store/useAuthStore';
import '../styles/pages/LoginPage.css'; 

const LoginPage = () => {
    // AHORA USA EMAIL EN LUGAR DE USERNAME
    const [credentials, setCredentials] = useState({ email: '', password: '' });
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
            const data = await loginUsuario(credentials);
            // Si tu backend devuelve el token en la propiedad 'token'
            setToken(data.token); 
            setUser({ email: credentials.email }); 
            navigate('/');
        } catch (err) {
            setError('Credenciales inválidas. Intenta nuevamente.');
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f7fe', fontFamily: 'system-ui, sans-serif' }}>
            
            <div className="login-card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center', boxSizing: 'border-box' }}>
                
                <h2 className="login-title">Acceso al Sistema</h2>
                
                {error && <p style={{ color: '#d32f2f', fontSize: '13px', marginBottom: '20px', fontWeight: '500' }}>{error}</p>}
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                    {/* INPUT CORREGIDO A EMAIL */}
                    <input 
                        name="email" 
                        type="email"
                        placeholder="Correo Electrónico" 
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
                            backgroundColor: '#4318ff', 
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