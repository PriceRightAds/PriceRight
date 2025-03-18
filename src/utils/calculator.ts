import { MovingCost, MovingItem } from '../types';

export const calculateTotalCost = (cost: MovingCost): number => {
    return Object.values(cost).reduce((sum, fee) => sum + fee, 0);
};

export const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat('zh-HK', {
        style: 'currency',
        currency: 'HKD',
        currencyDisplay: 'symbol'
    }).format(amount);
};

export const calculateMovingFee = (items: MovingItem[]): number => {
    return items.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
}; 