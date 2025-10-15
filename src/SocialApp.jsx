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
        // Solo guarda si hay datos para evitar una escritura inicial vacía
        if (messages.length > 0 || notifications.length > 0 || directMessagesQueue.length > 0) {
            dispatch(startSavingData());
        }
    }, [messages, notifications, directMessagesQueue, dispatch]);

    const handleNewMessage = () => {
        const text = prompt("Escribe tu mensaje:");
        if (text) dispatch(addMessage({ id: new Date().getTime(), text, author: displayName }));
    }

    const handleNewNotification = () => {
        dispatch(addNotification({ id: new Date().getTime(), text: '¡Nueva interacción!' }));
    }

    const handleNewDM = () => {
        const text = prompt("Escribe tu mensaje directo:");
        if (text) dispatch(addDirectMessage({ id: new Date().getTime(), text, from: displayName }));
    }
    
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                <h1>Red Social UAO</h1>
                <p><strong>Notificaciones: {notifications.length}</strong></p>
                <div>
                    <span>Hola, {displayName}</span>
                    <button style={{ marginLeft: '10px' }} onClick={() => signOut(auth)}>Cerrar Sesión</button>
                </div>
            </header>

            <main style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
                {/* Columna de Mensajes (Lista) */}
                <section style={{ flex: 1 }}>
                    <h2>Muro (Lista)</h2>
                    <button onClick={handleNewMessage}>+ Nuevo Mensaje</button>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {[...messages].reverse().map(msg => (
                            <li key={msg.id} style={{ border: '1px solid #eee', padding: '10px', margin: '5px 0', borderRadius: '5px' }}>
                                {msg.text} <br/>- <em>{msg.author}</em>
                            </li>
                        ))}
                    </ul>
                </section>
                
                {/* Columna de Notificaciones (Pila) */}
                <section style={{ flex: 1 }}>
                    <h2>Notificaciones (Pila)</h2>
                    <button onClick={handleNewNotification}>Simular Notificación</button>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {notifications.map(notif => (
                            <li key={notif.id} style={{ background: '#f0f0f0', padding: '10px', margin: '5px 0', borderRadius: '5px' }}>
                                {notif.text}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Columna de Mensajes Directos (Cola) */}
                <section style={{ flex: 1 }}>
                    <h2>Mensajes Directos (Cola)</h2>
                    <button onClick={handleNewDM}>+ Nuevo DM</button>
                    <button onClick={() => dispatch(sendNextDirectMessage())} disabled={directMessagesQueue.length === 0} style={{ marginLeft: '10px' }}>
                        Enviar Siguiente
                    </button>
                    <p>En cola: {directMessagesQueue.length}</p>
                    <ol>
                        {directMessagesQueue.map(dm => <li key={dm.id}>{dm.text}</li>)}
                    </ol>
                </section>
            </main>
        </div>
    );
}

