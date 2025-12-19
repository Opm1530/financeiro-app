import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Card } from '../ui/BaseComponents';
import { formatCurrency } from '../../utils/format';
import { ShieldAlert, TrendingDown } from 'lucide-react';

export function FixedCostsScreen() {
    const { transactions, financials } = useFinance();

    // Filtrar apenas gastos fixos do mês atual (ou global? Request diz "Lista de gastos fixos mensais")
    // Vamos listar as transações marcadas como 'isFixed' e agrupar pela descrição ou categoria par ter uma visão de "contas"
    // Mas o modelo de transação atual é individual.
    // Vamos listar as últimas transações fixas.

    const fixedTransactions = transactions.filter(t => t.type === 'EXPENSE' && t.isFixed);

    // Calcular média mensal de gastos fixos (Simulação simples)
    const totalFixed = fixedTransactions.reduce((acc, t) => acc + t.amount, 0);

    const revenueImpact = financials.totalIncome > 0
        ? (financials.fixedExpenses / financials.totalIncome) * 100
        : 0;

    return (
        <div style={{ paddingBottom: '6rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Gastos Fixos</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Card>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>Total (Mês)</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        {formatCurrency(financials.fixedExpenses)}
                    </div>
                </Card>
                <Card>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>Impacto na Receita</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-warning)' }}>
                        {revenueImpact.toFixed(1)}%
                    </div>
                </Card>
            </div>

            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>Histórico de Fixos</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {fixedTransactions.length === 0 ? (
                    <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>Nenhum gasto fixo registrado.</p>
                ) : (
                    fixedTransactions.map(t => (
                        <Card key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '50%' }}>
                                    <ShieldAlert size={18} color="var(--color-danger)" />
                                </div>
                                <div style={{ fontWeight: 500 }}>{t.description || 'Gasto Fixo'}</div>
                            </div>
                            <div style={{ fontWeight: 600 }}>{formatCurrency(t.amount)}</div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
