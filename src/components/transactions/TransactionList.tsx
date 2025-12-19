import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Card } from '../ui/BaseComponents';
import { formatCurrency, formatDate } from '../../utils/format';
import { ArrowDownLeft, ArrowUpRight, Trash2 } from 'lucide-react';

export function TransactionList() {
    const { transactions, categories, deleteTransaction } = useFinance();

    const sortedTransactions = [...transactions].sort((a, b) => b.createdAt - a.createdAt);

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja excluir este lançamento?')) {
            await deleteTransaction(id);
        }
    }

    return (
        <div style={{ paddingBottom: '6rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Extrato</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {sortedTransactions.length === 0 ? (
                    <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '2rem' }}>
                        Nenhuma transação registrada.
                    </p>
                ) : (
                    sortedTransactions.map(t => {
                        const category = categories.find(c => c.id === t.categoryId);
                        const isIncome = t.type === 'INCOME';

                        return (
                            <Card key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flex: 1 }}>
                                    <div style={{
                                        background: isIncome ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                        padding: '0.5rem',
                                        borderRadius: '50%',
                                        display: 'flex'
                                    }}>
                                        {isIncome
                                            ? <ArrowUpRight size={20} color="var(--color-success)" />
                                            : <ArrowDownLeft size={20} color="var(--color-danger)" />
                                        }
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 500 }}>{category?.name || 'Sem categoria'}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                                            {formatDate(t.date)} {t.description && `• ${t.description}`}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        fontWeight: 600,
                                        color: isIncome ? 'var(--color-success)' : 'var(--color-text-primary)'
                                    }}>
                                        {isIncome ? '+' : '-'} {formatCurrency(t.amount)}
                                    </div>

                                    <button
                                        onClick={() => handleDelete(t.id)}
                                        style={{ padding: '0.5rem', color: 'var(--color-text-muted)', opacity: 0.5, transition: 'opacity 0.2s' }}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>
        </div>
    );
}
