import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

export function formatCurrency(value: number | undefined): string {
    if (value === undefined || value === null) return 'N/A';

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

export function formatNumber(value: number | undefined): string {
    if (value === undefined || value === null) return 'N/A';

    if (value >= 1e12) {
        return (value / 1e12).toFixed(2) + 'T';
    } else if (value >= 1e9) {
        return (value / 1e9).toFixed(2) + 'B';
    } else if (value >= 1e6) {
        return (value / 1e6).toFixed(2) + 'M';
    } else if (value >= 1e3) {
        return (value / 1e3).toFixed(2) + 'K';
    }

    return value.toFixed(2);
}

export function formatPercentage(value: number | undefined): string {
    if (value === undefined || value === null) return 'N/A';

    return (value * 100).toFixed(2) + '%';
}

export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

export function capitalizeWords(str: string): string {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === 'string') {
        return error;
    }

    return 'An unknown error occurred';
}
