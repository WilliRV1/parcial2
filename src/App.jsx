import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { login, logout } from './store/auth/authSlice';
import { startLoadingData } from './store/social/thunks';

import { LoginPage } from './LoginPage';
import { SocialApp } from './SocialApp';

export const App = () => {
    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                dispatch(logout());
                return;
            };
            
            const { uid, email, displayName } = user;
            dispatch(login({ uid, email, displayName: displayName || 'Usuario' }));
            dispatch(startLoadingData());
        });
    }, [dispatch]);

    if (status === 'checking') {
        return <h3 style={{ textAlign: 'center', fontFamily: 'Arial' }}>Validando credenciales...</h3>
    }

    return (
        <>
            {status === 'authenticated' ? <SocialApp /> : <LoginPage />}
        </>
    );
}

