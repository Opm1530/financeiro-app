import { Card } from '../ui/BaseComponents';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency, getMonthName } from '../../utils/format';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export function SummaryWidget() {
    const { financials } = useFinance();

    return (
        <section>
            <header style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <div>
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Visão Geral</h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                        {getMonthName()}
                    </p>
                </div>
            </header>

            <Card style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.2)',
                        padding: '0.2rem',
                        width: '2rem',
                        height: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '100%'
                    }}>
                        <DollarSign size={20} color="white" />
                    </div>
                    <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>Saldo Atual</span>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'white' }}>
                    {formatCurrency(financials.balance)}
                </div>
            </Card>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <Card style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <TrendingUp size={16} color="var(--color-success)" />
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Entradas</span>
                    </div>
                    <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {formatCurrency(financials.totalIncome)}
                    </div>
                </Card>

                <Card style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <TrendingDown size={16} color="var(--color-danger)" />
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Saídas</span>
                    </div>
                    <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {formatCurrency(financials.totalExpense)}
                    </div>
                </Card>
            </div>
        </section>
    );
}
