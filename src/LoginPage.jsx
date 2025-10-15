import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase/config';
import { checkingCredentials, logout } from './store/auth/authSlice'; 

export const LoginPage = () => {
    const dispatch = useDispatch();
    const { status } = useSelector(state => state.auth); 
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(''); 
    
    const isChecking = status === 'checking';

    


    const onLogin = (e) => {
        e.preventDefault();
        setErrorMsg(''); 
        if (email.length === 0 || password.length === 0) {
            setErrorMsg('Debes ingresar correo y contraseña.');
            return;
        }

        dispatch(checkingCredentials());
        signInWithEmailAndPassword(auth, email, password)
            .catch(handleAuthError);
    }

    const onRegister = (e) => {
        e.preventDefault();
        setErrorMsg(''); 
        if (email.length === 0 || password.length === 0) {
            setErrorMsg('Debes ingresar correo y contraseña.');
            return;
        }

        dispatch(checkingCredentials());
        createUserWithEmailAndPassword(auth, email, password)
             .catch(handleAuthError);
    }
    
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', }}>
            <h1>Red Social UAO</h1>
            <h3>Iniciar Sesión o Registrarse</h3>
            <form>
                <input 
                   
                    type="email" 
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={isChecking}
                />
                <input 
               
                    type="password" 
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={isChecking}
                />
                
            

                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <button 
                        type="button" 
                        onClick={onLogin} 
                        disabled={isChecking}
                       
                    >
                        {isChecking ? 'Verificando...' : 'Iniciar Sesión'}
                    </button>
                    <button 
                        type="button" 
                        onClick={onRegister} 
                        disabled={isChecking}
                        
                    >
                        Registrarse
                    </button>
                </div>
            </form>
        </div>
    )
}
