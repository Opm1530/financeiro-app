import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    variant?: 'default' | 'highlight';
}

export function Card({ children, className = '', variant = 'default', style, ...props }: CardProps) {
    const bg = variant === 'highlight'
        ? 'linear-gradient(135deg, rgba(255, 219, 0, 0.2) 0%, rgba(30, 41, 59, 0.7) 100%)'
        : undefined;

    return (
        <div
            className={`glass-panel ${className}`}
            style={{ padding: '1.25rem', background: bg, ...style }}
            {...props}
        >
            {children}
        </div>
    );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    fullWidth?: boolean;
}

export function Button({ children, variant = 'primary', fullWidth, style, ...props }: ButtonProps) {
    const baseStyle: React.CSSProperties = {
        padding: '0.75rem 1rem',
        borderRadius: 'var(--radius-md)',
        fontWeight: 600,
        fontSize: 'var(--font-size-sm)',
        width: fullWidth ? '100%' : 'auto',
        transition: 'all 0.2s',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
    };

    const variants = {
        primary: { background: 'var(--color-primary)', color: 'var(--color-bg-main)' },
        secondary: { background: 'rgba(255,255,255,0.1)', color: 'var(--color-text-primary)' },
        danger: { background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.5)' },
        ghost: { background: 'transparent', color: 'var(--color-text-secondary)' }
    };

    return (
        <button style={{ ...baseStyle, ...variants[variant], ...style }} {...props}>
            {children}
        </button>
    );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export function Input({ label, style, ...props }: InputProps) {
    return (
        <div style={{ marginBottom: '1rem', width: '100%' }}>
            {label && (
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    {label}
                </label>
            )}
            <input
                style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--color-bg-input)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'white',
                    fontSize: '1rem',
                    ...style
                }}
                {...props}
            />
        </div>
    );
}
