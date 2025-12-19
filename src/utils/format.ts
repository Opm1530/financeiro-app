export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};

export const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(dateString));
};

export const getMonthName = (date: Date = new Date()) => {
    return new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(date);
};
