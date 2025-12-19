export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Category {
    id: string;
    name: string;
    type: TransactionType;
    isFixed?: boolean;
    budgetLimit?: number;
    color?: string;
}

export interface Transaction {
    id: string;
    amount: number;
    date: string; // ISO Date String
    categoryId: string;
    description?: string;
    type: TransactionType;
    isFixed?: boolean;
    isNewBusiness?: boolean; // Novo campo para Vendas Novas
    userId?: string; // Para identificar quem criou
    createdAt: number;
}

export interface Goal {
    id: string;
    name: string;
    type: 'MONTHLY_REVENUE' | 'ANNUAL_REVENUE' | 'ACCUMULATED_TOTAL';
    targetType?: 'ALL' | 'NEW_ONLY'; // Novo campo para filtrar o cálculo
    targetAmount: number;
    startDate: string;
    endDate: string;
    createdAt: number;
}
