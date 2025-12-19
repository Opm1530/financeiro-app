import React, { useState } from 'react';
import { Card, Button } from '../ui/BaseComponents';
import { auth } from '../../services/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { Lock } from 'lucide-react';

// TODO: ADICIONE AQUI OS EMAILS PERMITIDOS
const ALLOWED_EMAILS = [
    "pequidigital.inc@gmail.com"
];

export function LoginScreen() {
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            // Force account selection to avoid auto-login with wrong account
            provider.setCustomParameters({ prompt: 'select_account' });

            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            if (user.email && !ALLOWED_EMAILS.includes(user.email)) {
                await signOut(auth);
                setError(`Acesso negado para ${user.email}. Este email não tem permissão.`);
                return;
            }

        } catch (err: any) {
            console.error(err);
            setError('Erro ao fazer login. Tente novamente.');
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            background: 'var(--color-bg-main)'
        }}>
            <Card style={{ width: '100%', maxWidth: '400px', textAlign: 'center', padding: '2.5rem 1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    {/* Logo Placeholder - User can replace src later */}
                    <img src="/logo.png" alt="Logo" style={{ height: '64px', objectFit: 'contain' }}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    {/* Fallback Icon if logo fails to load */}
                    <div className="logo-fallback" style={{ display: 'none' }}>
                        <div style={{ background: 'rgba(255, 219, 0, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                            <Lock size={32} color="var(--color-primary)" />
                        </div>
                    </div>
                </div>

                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Acesso Restrito</h1>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                    Gestão Financeira Empresarial
                </p>

                <Button fullWidth onClick={handleLogin} style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', color: 'var(--color-bg-main)' }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Entrar com Google
                </Button>

                {error && <p style={{ color: 'var(--color-danger)', fontSize: '0.875rem', marginTop: '1rem' }}>{error}</p>}
            </Card>

            <script>{`
                // Simple script to show fallback if img fails (handled by onError in React ideally, but pure JS backup)
                document.querySelector('img').onerror = function() {
                    this.style.display = 'none';
                    document.querySelector('.logo-fallback').style.display = 'block';
                }
            `}</script>
        </div>
    );
}
