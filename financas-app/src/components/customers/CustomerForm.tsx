import { Button, Input } from '../ui/BaseComponents';
import { useFinance } from '../../context/FinanceContext';
import { X, Check, } from 'lucide-react';
import { useState } from 'react';
import { Customer } from '../../types';


interface CustomerFormProps {
    onClose: () => void;
}

const FONT_TYPES: { id: Customer['type']; label: string }[] = [
    { id: 'TRAFEGO', label: 'Tráfego Pago' },
    { id: 'RECOMENDACAO', label: 'Recomendação' },
    { id: 'COLD_CALL', label: 'Cold Call' },
];

export function CustomerForm({ onClose }: CustomerFormProps) {
    const { addCustomer } = useFinance();
    const [name, setName] = useState('');
    const [cpf, setCPF] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [adress, setAdress] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState<Customer['type']>('TRAFEGO');


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !adress|| !whatsapp || !cpf || !email) return;

        addCustomer({
            name,
            type,
            cpf,
            whatsapp,
            adress,
            email
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
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Novo Cliente</h2>
                    <button onClick={onClose}><X size={24} color="var(--color-text-secondary)" /></button>
                </div>

                <form onSubmit={handleSubmit}>


                    <Input
                        label="Nome do cliente"
                        placeholder="Ex: João Silva"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    
                    <Input
                        label="CPF/CNPJ"
                        placeholder="Ex: 123.456.789-00"
                        value={cpf}
                        onChange={e => setCPF(e.target.value)}
                    />

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Fonte</label>
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
                            {FONT_TYPES.map(t => (
                                <option key={t.id} value={t.id}>{t.label}</option>
                            ))}
                        </select>
                    </div>


                    <Input
                        label="Endereço"
                        type="text"
                        placeholder="Ex: Rua dos Bobos, 0, Centro, Belo Horizonte - MG"
                        value={adress}
                        onChange={e => setAdress(e.target.value)}
                    />

                    <Input
                        label="WhatsApp"
                        type="text"
                        placeholder="(00) 00000-0000"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Ex: 0aF4R@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <Button type="submit" fullWidth style={{ marginTop: '1rem' }}>
                        <Check size={20} /> Cadastrar Cliente
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
