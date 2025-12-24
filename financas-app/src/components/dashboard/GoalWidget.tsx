import { Card } from '../ui/BaseComponents';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency, formatDate } from '../../utils/format';
import { Target, Rocket } from 'lucide-react';
import { FinanceCalculator } from '../../utils/financeCalculations';

export function PriorityGoalWidget() {
    const { goals, transactions } = useFinance();

    // Sort by closest endDate
    const sortedGoals = [...goals].sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
    const priorityGoal = sortedGoals[0];

    if (!priorityGoal) {
        return (
            <Card style={{ marginTop: '1.5rem', borderStyle: 'dashed', textAlign: 'center', padding: '2rem' }}>
                <Target size={32} color="var(--color-text-muted)" style={{ marginBottom: '0.5rem' }} />
                <p style={{ color: 'var(--color-text-secondary)' }}>Nenhuma meta definida</p>
            </Card>
        );
    }

    // Centralized Calculation Logic
    const currentProgress = FinanceCalculator.calculateGoalProgress(priorityGoal, transactions);
    const percentage = Math.min(100, Math.max(0, (currentProgress / priorityGoal.targetAmount) * 100));

    return (
        <section style={{ marginTop: '1.5rem' }}>
            <header style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Target size={18} color="var(--color-primary)" />
                    Meta Prioritária
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-warning)', background: 'rgba(245, 158, 11, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                    Finaliza em {formatDate(priorityGoal.endDate)}
                </span>
            </header>

            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {priorityGoal.targetType === 'NEW_ONLY' && <Rocket size={14} color="var(--color-warning)" />}
                        <span style={{ fontWeight: 500 }}>{priorityGoal.name}</span>
                    </div>
                    <span style={{ fontWeight: 700 }}>{percentage.toFixed(0)}%</span>
                </div>

                {/* Progress Bar */}
                <div style={{ height: '8px', background: 'var(--color-bg-input)', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                    <div style={{
                        height: '100%',
                        width: `${percentage}%`,
                        background: priorityGoal.targetType === 'NEW_ONLY'
                            ? 'linear-gradient(90deg, var(--color-warning) 0%, var(--color-danger) 100%)'
                            : 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-success) 100%)',
                        transition: 'width 0.5s ease-out'
                    }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                    <span>Atual: {formatCurrency(currentProgress)}</span>
                    <span>Alvo: {formatCurrency(priorityGoal.targetAmount)}</span>
                </div>
            </Card>
        </section>
    );
}
