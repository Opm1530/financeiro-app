import { Button, Input } from '../ui/BaseComponents';
import { useFinance } from '../../context/FinanceContext';
import { X, Check} from 'lucide-react';
import { Contract } from '../../types';
import { useState } from 'react';

interface ContractFormProps {
    onClose: () => void;
}

type ServiceType = 'GESTAO_DE_TRAFEGO' | 'SOCIAL_MEDIA' | 'LANDING_PAGE' | 'AUTOMACAO' | 'GOOGLE_MEU_NEGOCIO';

const SERVICES_TYPES: { id: ServiceType; label: string }[] = [
    { id: 'GESTAO_DE_TRAFEGO', label: 'Gestão de Tráfego' },
    { id: 'SOCIAL_MEDIA', label: 'Social Media' },
    { id: 'AUTOMACAO', label: 'Automação' },
    { id: 'LANDING_PAGE', label: 'Landing Page' },
    { id: 'GOOGLE_MEU_NEGOCIO', label: 'Google Meu Negócio' },
];

export function ContractForm({ onClose }: ContractFormProps) {
    const { addContract, customers } = useFinance();

    const [customer, setCustomer] = useState('');
    const [targetType, setTargetType] = useState<Contract['targetType']>('SINGLE');
    const [services, setServices] = useState<ServiceType[]>([]);
    const [value, setValue] = useState('');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!customer || !value || services.length === 0) return;

        addContract({
            customer,
            targetType,
            services,
            value,
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
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Novo Contrato</h2>
                    <button onClick={onClose}><X size={24} color="var(--color-text-secondary)" /></button>
                </div>

                <form onSubmit={handleSubmit}>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Cliente</label>
                        
                        <select
                            style={{
                                width: '100%', padding: '0.75rem', height: '48px',
                                background: 'var(--color-bg-input)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 'var(--radius-sm)',
                                color: 'white', fontSize: '1rem'
                            }}
                            value={customer}
                            onChange={e => setCustomer(e.target.value)}
                        >
                            <option value="">Selecione um cliente</option>
                            {customers.map(customer => (
                                <option key={customer.id} value={customer.id}>{customer.name}</option>
                            ))}
                        </select>

                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Tipo de Contrato</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Button
                                type="button"
                                variant={targetType === 'SINGLE' ? 'primary' : 'secondary'}
                                onClick={() => setTargetType('SINGLE')}
                                style={{ flex: 1, justifyContent: 'center' }}
                            >
                                Único
                            </Button>
                            <Button
                                type="button"
                                variant={targetType === 'RECURRING' ? 'primary' : 'secondary'}
                                onClick={() => setTargetType('RECURRING')}
                                style={{ flex: 1, justifyContent: 'center' }}
                            >
                                Recorrente
                            </Button>
                        </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                            Serviços {services.length > 0 && <span style={{ color: 'var(--color-primary)' }}>({services.length} selecionado{services.length > 1 ? 's' : ''})</span>}
                        </label>
                        <div style={{ 
                            background: 'var(--color-bg-input)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '0.75rem'
                        }}>
                            {SERVICES_TYPES.map(t => (
                                <label 
                                    key={t.id} 
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '0.5rem',
                                        padding: '0.5rem',
                                        cursor: 'pointer',
                                        borderRadius: 'var(--radius-sm)',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <input
                                        type="checkbox"
                                        checked={services.includes(t.id)}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                setServices([...services, t.id]);
                                            } else {
                                                setServices(services.filter(s => s !== t.id));
                                            }
                                        }}
                                        style={{
                                            width: '18px',
                                            height: '18px',
                                            cursor: 'pointer',
                                            accentColor: 'var(--color-primary)'
                                        }}
                                    />
                                    <span style={{ fontSize: '0.95rem' }}>{t.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <Input
                        label="Valor do Contrato"
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        value={value}
                        onChange={e => setValue(e.target.value)}
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
                        <Check size={20} /> Cadastrar Contrato
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