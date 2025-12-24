import { Contact, HelpCircle, Megaphone, PhoneCall, Plus, Trash2, Users, Mail, Phone, MapPin, FileText } from "lucide-react";
import { Button, Card } from "../ui/BaseComponents";
import { useState } from "react";
import { CustomerForm } from "./CustomerForm";
import { useFinance } from '../../context/FinanceContext';

const CUSTOMER_TYPE_CONFIG: Record<
  string,
  {
    icon: React.ElementType;
    color: string;
    label: string;
  }
> = {
  TRAFEGO: {
    icon: Megaphone,
    color: '#3b82f6',
    label: 'Tráfego Pago'
  },
  RECOMENDACAO: {
    icon: Users,
    color: '#10b981',
    label: 'Recomendação'
  },
  COLD_CALL: {
    icon: PhoneCall,
    color: '#f59e0b',
    label: 'Cold Call'
  }
};

export function CustomersList() {
    const { customers, deleteCustomer } = useFinance();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleDelete = async (id: string) => {
        if (confirm('Deseja excluir este cliente?')) {
            await deleteCustomer(id);
        }
    }

    const formatCpfCnpj = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length === 11) {
            return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }
        if (numbers.length === 14) {
            return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        }
        return value;
    }

    const formatPhone = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length === 11) {
            return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
        if (numbers.length === 10) {
            return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        return value;
    }

    return (
        <div style={{ paddingBottom: '6rem' }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '1.5rem' 
            }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Clientes</h2>
                <Button variant="secondary" onClick={() => setIsFormOpen(true)} style={{ padding: '0.5rem' }}>
                    <Plus size={20} />
                </Button>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {customers.map(customer => {
                    const typeConfig = CUSTOMER_TYPE_CONFIG[customer.type] ?? {
                        icon: HelpCircle,
                        color: 'var(--color-text-muted)',
                        label: customer.type
                    };

                    const TypeIcon = typeConfig.icon;

                    return (
                        <Card key={customer.id}>
                            {/* Cabeçalho com nome e ações */}
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'flex-start',
                                marginBottom: '0.75rem' 
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Contact size={18} color="var(--color-primary)" />
                                    <span style={{ fontWeight: 600, fontSize: '1rem' }}>
                                        {customer.name}
                                    </span>
                                </div>
                                <button 
                                    onClick={() => handleDelete(customer.id)} 
                                    style={{ 
                                        color: 'var(--color-text-muted)',
                                        transition: 'color 0.2s'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-danger)'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            {/* Informações de contato */}
                            <div style={{ 
                                display: 'grid',
                                gap: '0.5rem',
                                marginBottom: '0.75rem'
                            }}>
                                {customer.email && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Mail size={14} color="var(--color-text-secondary)" />
                                        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                            {customer.email}
                                        </span>
                                    </div>
                                )}
                                
                                {customer.whatsapp && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Phone size={14} color="var(--color-text-secondary)" />
                                        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                            {formatPhone(customer.whatsapp)}
                                        </span>
                                    </div>
                                )}

                                {customer.cpf && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FileText size={14} color="var(--color-text-secondary)" />
                                        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                            {formatCpfCnpj(customer.cpf)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Endereço e tipo de origem */}
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between',
                                paddingTop: '0.75rem',
                                borderTop: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                {customer.adress ? (
                                    <div style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '0.5rem',
                                        flex: 1,
                                        minWidth: 0
                                    }}>
                                        <MapPin size={14} color="var(--color-text-secondary)" style={{ flexShrink: 0 }} />
                                        <span style={{ 
                                            fontSize: '0.75rem', 
                                            color: 'var(--color-text-secondary)',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {customer.adress}
                                        </span>
                                    </div>
                                ) : (
                                    <div />
                                )}

                                {/* Badge de origem com tooltip */}
                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '36px',
                                            height: '36px',
                                            background: `${typeConfig.color}20`,
                                            border: `1px solid ${typeConfig.color}50`,
                                            borderRadius: '8px',
                                            color: typeConfig.color,
                                            cursor: 'help',
                                            transition: 'all 0.2s ease',
                                            flexShrink: 0
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.background = `${typeConfig.color}35`;
                                            e.currentTarget.style.borderColor = `${typeConfig.color}80`;
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            const tooltip = e.currentTarget.nextElementSibling as HTMLElement;
                                            if (tooltip) tooltip.style.opacity = '1';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.background = `${typeConfig.color}20`;
                                            e.currentTarget.style.borderColor = `${typeConfig.color}50`;
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            const tooltip = e.currentTarget.nextElementSibling as HTMLElement;
                                            if (tooltip) tooltip.style.opacity = '0';
                                        }}
                                    >
                                        <TypeIcon size={16} />
                                    </div>
                                    {/* Tooltip */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: '100%',
                                            right: '0',
                                            marginBottom: '8px',
                                            padding: '6px 12px',
                                            background: 'rgba(0, 0, 0, 0.9)',
                                            color: 'white',
                                            fontSize: '0.75rem',
                                            borderRadius: '6px',
                                            whiteSpace: 'nowrap',
                                            opacity: 0,
                                            pointerEvents: 'none',
                                            transition: 'opacity 0.2s ease',
                                            zIndex: 10,
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                                        }}
                                    >
                                        Origem: {typeConfig.label}
                                        {/* Seta do tooltip */}
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '100%',
                                                right: '12px',
                                                width: 0,
                                                height: 0,
                                                borderLeft: '6px solid transparent',
                                                borderRight: '6px solid transparent',
                                                borderTop: '6px solid rgba(0, 0, 0, 0.9)'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    );
                })}
                
                {customers.length === 0 && (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '3rem 1rem',
                        color: 'var(--color-text-secondary)' 
                    }}>
                        <Contact size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                        <p>Nenhum cliente cadastrado.</p>
                        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                            Clique no botão + para adicionar seu primeiro cliente.
                        </p>
                    </div>
                )}
            </div>
            
            {isFormOpen && <CustomerForm onClose={() => setIsFormOpen(false)} />}
        </div>
    );
}