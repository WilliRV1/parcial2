import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from './firebase/config';
import { addMessage, addNotification, addDirectMessage, sendNextDirectMessage } from './store/social/socialSlice';
import { startSavingData } from './store/social/thunks';

export const SocialApp = () => {
    const dispatch = useDispatch();
    const { displayName } = useSelector(state => state.auth);
    const { messages, notifications, directMessagesQueue } = useSelector(state => state.social);
    
    // Autoguardado en Firebase
    useEffect(() => {
       
        if (messages.length > 0 || notifications.length > 0 || directMessagesQueue.length > 0) {
            dispatch(startSavingData());
        }
    }, [messages, notifications, directMessagesQueue, dispatch]);

    const handleNewMessage = () => {
        const text = prompt("Escribe mensaje:");
        if (text) dispatch(addMessage({ id: new Date().getTime(), text, author: displayName }));
    }

    // Notificaciones Dinámicas 
    const handleNewNotification = () => {
        const notificationCount = notifications.length + 1; 
        
        dispatch(addNotification({ id: new Date().getTime(), text: `notificación ${notificationCount}` }));
    }

    const handleNewDM = () => {
        const text = prompt("Escribe mensaje:");
        if (text) dispatch(addDirectMessage({ id: new Date().getTime(), text, from: displayName }));
    }

    const handleSendNextDM = () => {
        
        dispatch(sendNextDirectMessage());
    }
    
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                <h1>Red Social UAO</h1>
                <p><strong>Notificaciones: {notifications.length}</strong></p>
                <div>
                    <span>Hola, {displayName}</span>
                    <button onClick={() => signOut(auth)}>Cerrar Sesión</button>
                </div>
            </header>

            <main style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
                
                <section style={{ flex: 1 }}>
                    <h2>Muro</h2>
                    <button onClick={handleNewMessage}>+ Nuevo Mensaje</button>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                       
                        {[...messages].reverse().map(msg => (
                            <li key={msg.id} >
                                {msg.text} <br/>- <em>{msg.author}</em>
                            </li>
                        ))}
                    </ul>
                </section>
                
                
                <section style={{ flex: 1 }}>
                    <h2>Notificaciones en pila</h2>
                    <button onClick={handleNewNotification}>notificación</button>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {notifications.map(notif => (
                           
                            <li key={notif.id} >
                                {notif.text}
                            </li>
                        ))}
                    </ul>
                </section>

              
                <section style={{ flex: 1 }}>
                    <h2>Mensajes Directos</h2>
                    <button onClick={handleNewDM}>+ Nuevo DM</button>
                    <button 
                        onClick={handleSendNextDM} 
                        disabled={directMessagesQueue.length === 0} 
                        style={{ marginLeft: '10px' }}
                    >
                        Enviar Siguiente
                    </button>
                    <p>En cola: {directMessagesQueue.length}</p>
                    <ol>
                        {}
                        {directMessagesQueue.map(dm => <li key={dm.id}>{dm.text}</li>)}
                    </ol>
                </section>
            </main>
        </div>
    );
}
