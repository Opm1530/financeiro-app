import React from 'react';
import { LayoutDashboard, Wallet, TrendingUp, PlusCircle, Shield } from 'lucide-react';

interface NavigationBarProps {
    currentTab: string;
    onTabChange: (tab: string) => void;
    onOpenNewTransaction: () => void;
}

export function NavigationBar({ currentTab, onTabChange, onOpenNewTransaction }: NavigationBarProps) {
    const navItems = [
        { id: 'dashboard', label: 'Início', icon: LayoutDashboard },
        { id: 'transactions', label: 'Caixa', icon: Wallet },
        { id: 'fixed', label: 'Fixos', icon: Shield },
        { id: 'goals', label: 'Metas', icon: TrendingUp },
    ];

    return (
        <nav style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            justifyContent: 'space-around',
            padding: '0.75rem',
            zIndex: 50
        }}>
            {navItems.map(item => {
                const isActive = currentTab === item.id;
                const Icon = item.icon;

                return (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.25rem',
                            color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                            opacity: isActive ? 1 : 0.7,
                            transition: 'all 0.2s'
                        }}
                    >
                        <Icon size={24} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>{item.label}</span>
                    </button>
                );
            })}

            <button
                onClick={onOpenNewTransaction}
                style={{
                    position: 'absolute',
                    top: '-1.5rem',
                    right: '1.5rem',
                    background: 'var(--color-primary)',
                    borderRadius: '50%',
                    width: '3.5rem',
                    height: '3.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 6px -1px var(--color-primary-glow)',
                    color: 'var(--color-bg-main)'
                }}
            >
                <PlusCircle size={32} />
            </button>
        </nav>
    );
}
