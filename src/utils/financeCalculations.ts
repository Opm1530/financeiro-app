import { Transaction, Goal } from '../types';

export const FinanceCalculator = {
    calculateGoalProgress: (goal: Goal, transactions: Transaction[]): number => {
        // 1. Filtrar transações relevantes para o tipo de meta (Receita vs Outros)
        // Assumindo que metas atuais são focadas em RECEITA (INCOME)
        let filteredTransactions = transactions.filter(t => t.type === 'INCOME');

        // 2. Filtro por Data
        const startDate = new Date(goal.startDate).getTime();
        const endDate = new Date(goal.endDate).setHours(23, 59, 59, 999);

        if (goal.type === 'MONTHLY_REVENUE') {
            // Para receita mensal, verificamos se a transação está no mês "ATUAL" relativo à meta
            // Se a meta é "Faturamento Março", o endDate define o mês.
            const targetMonth = new Date(goal.endDate).getMonth();
            const targetYear = new Date(goal.endDate).getFullYear();

            filteredTransactions = filteredTransactions.filter(t => {
                const d = new Date(t.date);
                return d.getMonth() === targetMonth && d.getFullYear() === targetYear;
            });
        } else {
            // Filtro genérico por range de datas
            filteredTransactions = filteredTransactions.filter(t => {
                const tDate = new Date(t.date).getTime();
                return tDate >= startDate && tDate <= endDate;
            });
        }

        // 3. Filtro por Vendas Novas (Feature request)
        if (goal.targetType === 'NEW_ONLY') {
            filteredTransactions = filteredTransactions.filter(t => t.isNewBusiness === true);
        }

        // Soma
        return filteredTransactions.reduce((acc, t) => acc + t.amount, 0);
    },

    calculateBalance: (transactions: Transaction[]) => {
        const income = transactions.filter(t => t.type === 'INCOME').reduce((acc, t) => acc + t.amount, 0);
        const expense = transactions.filter(t => t.type === 'EXPENSE').reduce((acc, t) => acc + t.amount, 0);
        return income - expense;
    },

    calculateFixedCosts: (transactions: Transaction[]) => {
        return transactions
            .filter(t => t.type === 'EXPENSE' && t.isFixed)
            .reduce((acc, t) => acc + t.amount, 0);
    }
};
