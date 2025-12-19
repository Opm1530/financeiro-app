import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Card, Button } from '../ui/BaseComponents';
import { formatCurrency, formatDate } from '../../utils/format';
import { Target, Plus, Rocket, Trash2 } from 'lucide-react';
import { GoalForm } from './GoalForm';
import { FinanceCalculator } from '../../utils/financeCalculations';

export function GoalsList() {
    const { goals, transactions, deleteGoal } = useFinance();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleDelete = async (id: string) => {
        if (confirm('Deseja excluir esta meta?')) {
            await deleteGoal(id);
        }
    }

    return (
        <div style={{ paddingBottom: '6rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Metas Ativas</h2>
                <Button variant="secondary" onClick={() => setIsFormOpen(true)} style={{ padding: '0.5rem' }}>
                    <Plus size={20} />
                </Button>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {goals.map(goal => {
                    const current = FinanceCalculator.calculateGoalProgress(goal, transactions);
                    const percent = Math.min(100, Math.max(0, (current / goal.targetAmount) * 100));
                    const isNewOnly = goal.targetType === 'NEW_ONLY';

                    return (
                        <Card key={goal.id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {isNewOnly && <Rocket size={16} color="var(--color-warning)" />}
                                        <span style={{ fontWeight: 500 }}>{goal.name}</span>
                                    </div>
                                    {isNewOnly && <span style={{ fontSize: '0.75rem', color: 'var(--color-warning)', fontStyle: 'italic' }}>Apenas Vendas Novas</span>}
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                                        Fim: {formatDate(goal.endDate)}
                                    </span>
                                    <button onClick={() => handleDelete(goal.id)} style={{ color: 'var(--color-text-muted)' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'end', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1 }}>{percent.toFixed(0)}%</span>
                                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.2rem' }}>de {formatCurrency(goal.targetAmount)}</span>
                            </div>

                            <div style={{ height: '6px', background: 'var(--color-bg-input)', borderRadius: '3px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                                <div style={{
                                    height: '100%',
                                    width: `${percent}%`,
                                    background: isNewOnly ? 'linear-gradient(90deg, var(--color-warning), var(--color-danger))' : 'var(--color-primary)'
                                }} />
                            </div>

                            <div style={{ textAlign: 'right', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                                {formatCurrency(current)}
                            </div>
                        </Card>
                    );
                })}
                {goals.length === 0 && (
                    <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>Nenhuma meta cadastrada.</p>
                )}
            </div>

            {isFormOpen && <GoalForm onClose={() => setIsFormOpen(false)} />}
        </div>
    );
}
