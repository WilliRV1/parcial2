import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase/config';
import { checkingCredentials } from './store/auth/authSlice';

export const LoginPage = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const onLogin = (e) => {
        e.preventDefault();
        if (email.length === 0 || password.length === 0) return;
        dispatch(checkingCredentials());
        signInWithEmailAndPassword(auth, email, password)
            .catch(error => {
                console.error("Error al iniciar sesión:", error.message);
                alert("Error al iniciar sesión. Revisa tus credenciales.");
            });
    }

    const onRegister = (e) => {
        e.preventDefault();
        if (email.length === 0 || password.length === 0) return;
        dispatch(checkingCredentials());
        createUserWithEmailAndPassword(auth, email, password)
             .catch(error => {
                console.error("Error al registrarse:", error.message);
                alert("Error al registrarse. Intenta con otro correo o una contraseña más segura.");
            });
    }
    
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '10px', textAlign: 'center' }}>
            <h1>Red Social UAO</h1>
            <h3>Iniciar Sesión o Registrarse</h3>
            <form>
                <input 
                    style={{ width: '95%', padding: '10px', marginBottom: '10px' }}
                    type="email" 
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    style={{ width: '95%', padding: '10px', marginBottom: '20px' }}
                    type="password" 
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <button type="button" onClick={onLogin}>Iniciar Sesión</button>
                    <button type="button" onClick={onRegister}>Registrarse</button>
                </div>
            </form>
        </div>
    )
}

