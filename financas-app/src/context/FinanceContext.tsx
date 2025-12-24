import { createContext, useContext, ReactNode } from 'react';
import { useFinanceData } from '../hooks/useFinanceData';
import { Transaction, Category, Goal, Customer, Contract } from '../types';

interface FinanceContextData {
    transactions: Transaction[];
    categories: Category[];
    goals: Goal[];
    customers: Customer[];
    contracts: Contract[];
    financials: {
        totalIncome: number;
        totalExpense: number;
        balance: number;
        totalRecurrence: number;
        fixedExpenses: number;
        totalCustomers: number;
        calculateActiveContracts: number;
    };
    addTransaction: (t: Omit<Transaction, "id" | "createdAt">) => void;
    deleteTransaction: (id: string) => Promise<void>;
    addGoal: (g: Omit<Goal, "id" | "createdAt">) => void;
    addContract: (c: Omit<Contract, "id" | "createdAt">) => void;
    addCustomer: (c: Omit<Customer, "id" | "createdAt">) => void;
    deleteGoal: (id: string) => Promise<void>;
    deleteCustomer: (id: string) => Promise<void>;
    deleteContract: (id: string) => Promise<void>;
    loading: boolean;
}

const FinanceContext = createContext<FinanceContextData>({} as FinanceContextData);

export function FinanceProvider({ children }: { children: ReactNode }) {
    const financeData = useFinanceData();

    if (financeData.loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>Carregando dados...</div>;
    }

    return (
        <FinanceContext.Provider value={financeData}>
            {children}
        </FinanceContext.Provider>
    );
}

export function useFinance() {
    return useContext(FinanceContext);
}
