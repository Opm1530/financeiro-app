import { Button, Input } from '../ui/BaseComponents';
import { useFinance } from '../../context/FinanceContext';
import { X, Check } from 'lucide-react';
import { useState } from 'react';

interface TransactionFormProps {
    onClose: () => void;
}

export function TransactionForm({ onClose }: TransactionFormProps) {
    const { addTransaction, categories } = useFinance();
    const [type, setType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [isFixed, setIsFixed] = useState(false);
    const [isNewBusiness, setIsNewBusiness] = useState(false);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !categoryId) return;

        addTransaction({
            amount: parseFloat(amount),
            description,
            categoryId,
            date,
            type,
            isFixed: type === 'EXPENSE' ? isFixed : false,
            isNewBusiness: type === 'INCOME' ? isNewBusiness : false
        });
        onClose();
    };

    const filteredCategories = categories.filter(c => c.type === type);

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'end', justifyContent: 'center'
        }}>
            <div className="glass-panel" style={{
                width: '100%', maxWidth: '600px',
                borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
                padding: '1.5rem',
                animation: 'slideUp 0.3s ease-out'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Nova Transação</h2>
                    <button onClick={onClose}><X size={24} color="var(--color-text-secondary)" /></button>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <Button
                        fullWidth
                        variant={type === 'INCOME' ? 'primary' : 'secondary'}
                        onClick={() => { setType('INCOME'); setCategoryId(''); }}
                        style={type === 'INCOME' ? { background: 'var(--color-success)' } : {}}
                    >
                        Entrada
                    </Button>
                    <Button
                        fullWidth
                        variant={type === 'EXPENSE' ? 'primary' : 'secondary'}
                        onClick={() => { setType('EXPENSE'); setCategoryId(''); }}
                        style={type === 'EXPENSE' ? { background: 'var(--color-danger)' } : {}}
                    >
                        Saída
                    </Button>
                </div>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Valor"
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        autoFocus
                        style={{ fontSize: '1.5rem', fontWeight: 600 }}
                    />

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Categoria</label>
                        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                            {filteredCategories.map(cat => (
                                <button
                                    type="button"
                                    key={cat.id}
                                    onClick={() => setCategoryId(cat.id)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '2rem',
                                        border: `1px solid ${categoryId === cat.id ? cat.color : 'rgba(255,255,255,0.1)'}`,
                                        background: categoryId === cat.id ? cat.color : 'transparent',
                                        color: categoryId === cat.id ? '#fff' : 'var(--color-text-secondary)',
                                        whiteSpace: 'nowrap',
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Input
                        label="Data"
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />

                    {/* Opções de Saída */}
                    {type === 'EXPENSE' && (
                        <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                                type="checkbox"
                                id="isFixed"
                                checked={isFixed}
                                onChange={e => setIsFixed(e.target.checked)}
                                style={{ width: '1.25rem', height: '1.25rem' }}
                            />
                            <label htmlFor="isFixed" style={{ color: 'var(--color-text-primary)' }}>É um Gasto Fixo (Recorrente)</label>
                        </div>
                    )}

                    {/* Opções de Entrada - Venda Nova */}
                    {type === 'INCOME' && (
                        <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                                type="checkbox"
                                id="isNewBusiness"
                                checked={isNewBusiness}
                                onChange={e => setIsNewBusiness(e.target.checked)}
                                style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--color-success)' }}
                            />
                            <label htmlFor="isNewBusiness" style={{ color: 'var(--color-text-primary)' }}>Venda Nova / Primeiro Contrato</label>
                        </div>
                    )}

                    <Input
                        label="Observação"
                        placeholder="Opcional"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <Button type="submit" fullWidth style={{ marginTop: '1rem', padding: '1rem' }}>
                        <Check size={20} /> Salvar Lançamento
                    </Button>
                </form>
            </div>
            <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
