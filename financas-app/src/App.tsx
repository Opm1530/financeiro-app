import { useState, useEffect } from 'react';
import { FinanceProvider } from './context/FinanceContext';
import { NavigationBar } from './components/layout/NavigationBar';
import { Dashboard } from './components/dashboard/Dashboard';
import { TransactionList } from './components/transactions/TransactionList';
import { TransactionForm } from './components/transactions/TransactionForm';
import { FixedCostsScreen } from './components/fixed-costs/FixedCostsScreen';
import { GoalsList } from './components/goals/GoalsList';
import { LoginScreen } from './components/auth/LoginScreen';
import { auth } from './services/firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { LogOut } from 'lucide-react';
import { ContractsList } from './components/contracts/ContractsList';
import { CustomersList } from './components/customers/CustomersList';


function App() {
    const [user, setUser] = useState<User | null>(null);
    const [loadingInitial, setLoadingInitial] = useState(true);

    const [currentTab, setCurrentTab] = useState('dashboard');
    const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoadingInitial(false);
        });
        return () => unsubscribe();
    }, []);

    if (loadingInitial) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>Carregando...</div>;

    if (!user) {
        return <LoginScreen />;
    }

    return (
        <FinanceProvider>
            <div className="container">

                <header style={{ marginTop: '1rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        {/* LOGO DA EMPRESA */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img
                                src="/logo.png"
                                alt="Logo"
                                style={{ height: '40px', objectFit: 'contain' }}
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.5px' }}>Financeiro</h1>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textAlign: 'right' }}>
                            {user.displayName?.split(' ')[0]}
                        </div>
                        <button onClick={() => signOut(auth)} style={{ color: 'var(--color-danger)' }}>
                            <LogOut size={20} />
                        </button>
                    </div>
                </header>

                <main>
                    {currentTab === 'dashboard' && <Dashboard />}
                    {currentTab === 'transactions' && <TransactionList />}
                    {currentTab === 'contracts' && <ContractsList />}
                    {currentTab === 'customers' && <CustomersList />}
                    {currentTab === 'fixed' && <FixedCostsScreen />}
                    {currentTab === 'goals' && <GoalsList />}
                </main>

                <NavigationBar
                    currentTab={currentTab}
                    onTabChange={setCurrentTab}
                    onOpenNewTransaction={() => setIsTransactionFormOpen(true)}
                />

                {isTransactionFormOpen && (
                    <TransactionForm onClose={() => setIsTransactionFormOpen(false)} />
                )}

            </div>
        </FinanceProvider>
    );
}

export default App;
