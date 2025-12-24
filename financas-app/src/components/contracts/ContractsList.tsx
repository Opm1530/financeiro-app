import { Contact, Plus, Trash2, Calendar } from "lucide-react";
import { Button, Card } from "../ui/BaseComponents";
import { useState } from "react";
import { ContractForm } from "./ContractForm";
import { useFinance } from "../../context/FinanceContext";

export function ContractsList() {
    const { contracts, deleteContract, customers } = useFinance();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleDelete = async (id: string) => {
        if (confirm('Deseja excluir este contrato?')) {
            await deleteContract(id);
        }
    }

    const getCustomerName = (customerId: string) => {
        const customer = customers.find(c => c.id === customerId);
        return customer?.name || customerId;
    }

    const calculateDaysRemaining = (endDate: string) => {
        if (!endDate) return null;
        const today = new Date();
        const end = new Date(endDate);
        const diffTime = end.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    const formatDate = (date: string) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('pt-BR');
    }

    const formatValue = (value: string) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(parseFloat(value));
    }



    const getServiceLabel = (serviceId: string) => {
        const labels: Record<string, string> = {
            'GESTAO_DE_TRAFEGO': 'Gestão de Tráfego',
            'SOCIAL_MEDIA': 'Social Media',
            'AUTOMACAO': 'Automação',
            'LANDING_PAGE': 'Landing Page',
            'GOOGLE_MEU_NEGOCIO': 'Google Meu Negócio'
        };
        return labels[serviceId] || serviceId;
    }

    return (
        <div style={{ paddingBottom: '6rem' }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '1.5rem' 
            }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Contratos</h2>
                <Button variant="secondary" onClick={() => setIsFormOpen(true)} style={{ padding: '0.5rem' }}>
                    <Plus size={20} />
                </Button>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {contracts.map(contract => {
                    const daysRemaining = calculateDaysRemaining(contract.endDate);
                    const isExpiringSoon = daysRemaining !== null && daysRemaining <= 30 && daysRemaining >= 0;
                    const isExpired = daysRemaining !== null && daysRemaining < 0;

                    return (
                        <Card key={contract.id}>
                            {/* Cabeçalho com cliente e ações */}
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'flex-start',
                                marginBottom: '0.75rem' 
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Contact size={18} color="var(--color-primary)" />
                                    <span style={{ fontWeight: 600, fontSize: '1rem' }}>
                                        {getCustomerName(contract.customer)}
                                    </span>
                                </div>
                                <button 
                                    onClick={() => handleDelete(contract.id)} 
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

                            {/* Tipo de contrato e valor */}
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                marginBottom: '0.75rem' 
                            }}>
                                <span style={{ 
                                    fontSize: '0.75rem', 
                                    color: 'var(--color-text-secondary)',
                                    textTransform: 'uppercase',
                                    fontWeight: 500
                                }}>
                                    {contract.targetType === 'RECURRING' ? 'Recorrente' : 'Único'}
                                </span>
                                <span style={{ 
                                    fontWeight: 600, 
                                    fontSize: '1rem',
                                    color: 'var(--color-warning)'
                                }}>
                                    {formatValue(contract.value)}
                                </span>
                            </div>

                            {/* Serviços */}
                            <div style={{ marginBottom: '0.75rem' }}>
                                <div style={{ 
                                    display: 'flex', 
                                    flexWrap: 'wrap', 
                                    gap: '0.5rem' 
                                }}>
                                    {contract.services.map(service => (
                                        <span 
                                            key={service}
                                            style={{ 
                                                fontSize: '0.75rem',
                                                color: 'var(--color-warning)', 
                                                background: 'rgba(245, 158, 11, 0.1)', 
                                                padding: '2px 8px', 
                                                borderRadius: '4px'
                                            }}
                                        >
                                            {getServiceLabel(service)}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Datas e prazo */}
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '0.5rem',
                                justifyContent: 'space-between',
                                paddingTop: '0.75rem',
                                borderTop: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calendar size={14} color="var(--color-text-secondary)" />
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                                        {formatDate(contract.startDate)} → {formatDate(contract.endDate) || 'Indefinido'}
                                    </span>
                                </div>
                                {daysRemaining !== null && (
                                    <span style={{ 
                                        fontSize: '0.75rem',
                                        fontWeight: 500,
                                        color: isExpired 
                                            ? 'var(--color-danger)' 
                                            : isExpiringSoon 
                                                ? 'var(--color-warning)' 
                                                : 'var(--color-text-secondary)'
                                    }}>
                                        {isExpired 
                                            ? `Expirado há ${Math.abs(daysRemaining)} dias`
                                            : `${daysRemaining} dias restantes`
                                        }
                                    </span>
                                )}
                            </div>
                        </Card>
                    );
                })}
                
                {contracts.length === 0 && (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '3rem 1rem',
                        color: 'var(--color-text-secondary)' 
                    }}>
                        <Contact size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                        <p>Nenhum contrato encontrado.</p>
                        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                            Clique no botão + para adicionar seu primeiro contrato.
                        </p>
                    </div>
                )}
            </div>

            {isFormOpen && <ContractForm onClose={() => setIsFormOpen(false)} />}
        </div>
    );
}