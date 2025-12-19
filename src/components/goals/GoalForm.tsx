import React, { useState } from 'react';
import { Card, Button, Input } from '../ui/BaseComponents';
import { useFinance } from '../../context/FinanceContext';
import { X, Check } from 'lucide-react';
import { Goal } from '../../types';

interface GoalFormProps {
    onClose: () => void;
}

const GOAL_TYPES: { id: Goal['type']; label: string }[] = [
    { id: 'MONTHLY_REVENUE', label: 'Receita Mensal' },
    { id: 'ANNUAL_REVENUE', label: 'Receita Anual' },
    { id: 'ACCUMULATED_TOTAL', label: 'Faturamento Acumulado' },
];

export function GoalForm({ onClose }: GoalFormProps) {
    const { addGoal } = useFinance();
    const [name, setName] = useState('');
    const [type, setType] = useState<Goal['type']>('MONTHLY_REVENUE');
    const [targetType, setTargetType] = useState<Goal['targetType']>('ALL');
    const [targetAmount, setTargetAmount] = useState('');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !targetAmount || !endDate) return;

        addGoal({
            name,
            type,
            targetType,
            targetAmount: parseFloat(targetAmount),
            startDate,
            endDate
        });
        onClose();
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
            <div className="glass-panel" style={{
                width: '100%', maxWidth: '500px',
                padding: '1.5rem',
                animation: 'scaleIn 0.2s ease-out',
                maxHeight: '90vh', overflowY: 'auto'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Nova Meta</h2>
                    <button onClick={onClose}><X size={24} color="var(--color-text-secondary)" /></button>
                </div>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Nome da Meta"
                        placeholder="Ex: Vendas Novas Março"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Tipo de Meta</label>
                        <select
                            style={{
                                width: '100%', padding: '0.75rem', height: '48px',
                                background: 'var(--color-bg-input)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 'var(--radius-sm)',
                                color: 'white', fontSize: '1rem'
                            }}
                            value={type}
                            onChange={e => setType(e.target.value as any)}
                        >
                            {GOAL_TYPES.map(t => (
                                <option key={t.id} value={t.id}>{t.label}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>O que conta para a meta?</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Button
                                type="button"
                                variant={targetType === 'ALL' ? 'primary' : 'secondary'}
                                onClick={() => setTargetType('ALL')}
                                style={{ flex: 1, justifyContent: 'center' }}
                            >
                                Tudo
                            </Button>
                            <Button
                                type="button"
                                variant={targetType === 'NEW_ONLY' ? 'primary' : 'secondary'}
                                onClick={() => setTargetType('NEW_ONLY')}
                                style={{ flex: 1, justifyContent: 'center' }}
                            >
                                Só Vendas Novas
                            </Button>
                        </div>
                    </div>

                    <Input
                        label="Valor Alvo"
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        value={targetAmount}
                        onChange={e => setTargetAmount(e.target.value)}
                    />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <Input
                            label="Início"
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                        />
                        <Input
                            label="Término"
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                        />
                    </div>

                    <Button type="submit" fullWidth style={{ marginTop: '1rem' }}>
                        <Check size={20} /> Criar Meta
                    </Button>
                </form>
            </div>
            <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
        </div>
    );
}
