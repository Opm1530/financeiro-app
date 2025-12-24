import { Transaction, Category, Goal, Customer, Contract } from '../types';

const STORAGE_KEYS = {
    TRANSACTIONS: 'finance_app_transactions',
    CATEGORIES: 'finance_app_categories',
    GOALS: 'finance_app_goals',
    CUSTOMERS: 'finance_app_customers',
    CONTRACTS: 'finance_app_contracts',
};

// Dados iniciais para não começar vazio
const INITIAL_CATEGORIES: Category[] = [
    { id: '1', name: 'Vendas', type: 'INCOME', color: 'var(--color-success)' },
    { id: '2', name: 'Serviços', type: 'INCOME', color: 'var(--color-primary)' },
    { id: '3', name: 'Aluguel', type: 'EXPENSE', isFixed: true, color: 'var(--color-danger)' },
    { id: '4', name: 'Fornecedores', type: 'EXPENSE', isFixed: false, color: 'var(--color-warning)' },
    { id: '5', name: 'Outros', type: 'EXPENSE', isFixed: false, color: 'var(--color-text-muted)' },
];

export const StorageService = {
    getTransactions: (): Transaction[] => {
        const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
        return data ? JSON.parse(data) : [];
    },

    saveTransaction: (transaction: Transaction) => {
        const list = StorageService.getTransactions();
        list.push(transaction);
        localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(list));
        return list;
    },

    deleteTransaction: (id: string) => {
        const list = StorageService.getTransactions();
        const filtered = list.filter(t => t.id !== id);
        localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(filtered));
        return filtered;
    },

    getCategories: (): Category[] => {
        const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
        if (!data) {
            // Initialize if empty
            localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
            return INITIAL_CATEGORIES;
        }
        return JSON.parse(data);
    },

    saveCategory: (category: Category) => {
        const list = StorageService.getCategories();
        list.push(category);
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(list));
        return list;
    },

    getGoals: (): Goal[] => {
        const data = localStorage.getItem(STORAGE_KEYS.GOALS);
        return data ? JSON.parse(data) : [];
    },

    saveGoal: (goal: Goal) => {
        const list = StorageService.getGoals();
        list.push(goal);
        localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(list));
        return list;
    },

    updateGoal: (updatedGoal: Goal) => {
        const list = StorageService.getGoals();
        const index = list.findIndex(g => g.id === updatedGoal.id);
        if (index !== -1) {
            list[index] = updatedGoal;
            localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(list));
        }
        return list;
    },

    getCustomers: (): Customer[] => {
        const data = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
        return data ? JSON.parse(data) : [];
    },

    saveCustomer: (customer: Customer) => {
        const list = StorageService.getCustomers();
        list.push(customer);
        localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(list));
        return list;
    },

    getContracts: (): Contract[] => {
        const data = localStorage.getItem(STORAGE_KEYS.CONTRACTS);
        return data ? JSON.parse(data) : [];
    },

    saveContracts: (contracts: Contract) => {
        const list = StorageService.getContracts();
        list.push(contracts);
        localStorage.setItem(STORAGE_KEYS.CONTRACTS, JSON.stringify(list));
        return list;
    },

};
