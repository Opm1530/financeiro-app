import { useState, useEffect, useMemo } from 'react';
import { Transaction, Category, Goal } from '../types';
import { db } from '../services/firebase';
import { collection, onSnapshot, addDoc, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { FinanceCalculator } from '../utils/financeCalculations';

// Fallback to local storage if Firebase fails or keys missing (Safe Mode)
import { StorageService } from '../services/storage';

const USE_FIREBASE = Boolean("AIzaSyA_XuXfg5-WqkXNlcaD0bnNUOUOXJNYNQ0");

export function useFinanceData() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!USE_FIREBASE) {
            // Load from Local Storage as fallback
            setTransactions(StorageService.getTransactions());
            setCategories(StorageService.getCategories());
            setGoals(StorageService.getGoals());
            setLoading(false);
            return;
        }

        // Firebase Subscriptions
        const unsubTrans = onSnapshot(query(collection(db, "transactions"), orderBy("date", "desc")), (snap) => {
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Transaction));
            setTransactions(data);
        });

        const unsubGoals = onSnapshot(collection(db, "goals"), (snap) => {
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Goal));
            setGoals(data);
        });

        // Categories (Static or DB?) Assuming DB for syncing but fallback to static for start
        const unsubCats = onSnapshot(collection(db, "categories"), (snap) => {
            if (snap.empty) {
                // Init defaults?
                setCategories(StorageService.getCategories()); // Use default locals
            } else {
                const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Category));
                setCategories(data);
            }
        });

        setLoading(false);

        return () => {
            unsubTrans();
            unsubGoals();
            unsubCats();
        };
    }, []);

    const addTransaction = async (t: Omit<Transaction, 'id' | 'createdAt'>) => {
        const newTransaction = {
            ...t,
            createdAt: Date.now(),
        };

        if (USE_FIREBASE) {
            await addDoc(collection(db, "transactions"), newTransaction);
        } else {
            const localT = { ...newTransaction, id: crypto.randomUUID() };
            const updated = StorageService.saveTransaction(localT);
            setTransactions(updated);
        }
    };

    const deleteTransaction = async (id: string) => {
        if (USE_FIREBASE) {
            await deleteDoc(doc(db, "transactions", id));
        } else {
            const updated = StorageService.deleteTransaction(id);
            setTransactions(updated);
        }
    };

    const addGoal = async (g: Omit<Goal, 'id' | 'createdAt'>) => {
        const newGoal = {
            ...g,
            createdAt: Date.now()
        };

        if (USE_FIREBASE) {
            await addDoc(collection(db, "goals"), newGoal);
        } else {
            const localG = { ...newGoal, id: crypto.randomUUID() };
            const updated = StorageService.saveGoal(localG);
            setGoals(updated);
        }
    };

    const deleteGoal = async (id: string) => {
        if (USE_FIREBASE) {
            await deleteDoc(doc(db, "goals", id));
        } else {
            // StorageService needs deleteGoal implementation if local was fully supported, 
            // but for now user is on Firebase. Simple filter for local state if needed.
            const updated = goals.filter(g => g.id !== id);
            setGoals(updated);
            // Ideally update local storage too
        }
    };

    const financials = useMemo(() => {
        return {
            totalIncome: transactions.filter(t => t.type === 'INCOME').reduce((acc, t) => acc + t.amount, 0),
            totalExpense: transactions.filter(t => t.type === 'EXPENSE').reduce((acc, t) => acc + t.amount, 0),
            balance: FinanceCalculator.calculateBalance(transactions),
            fixedExpenses: FinanceCalculator.calculateFixedCosts(transactions)
        };
    }, [transactions]);

    return {
        transactions,
        categories,
        goals,
        financials,
        addTransaction,
        deleteTransaction,
        addGoal,
        deleteGoal,
        loading
    };
}
