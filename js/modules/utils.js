/**
 * Módulo de Utilidades
 * Funciones helper y utilidades generales
 */

import { CONFIG } from './config.js';

class Utils {
    /**
     * Formatea un número como moneda
     */
    formatCurrency(amount) {
        return new Intl.NumberFormat(CONFIG.LANGUAGE, {
            style: 'currency',
            currency: CONFIG.DEFAULT_CURRENCY,
            minimumFractionDigits: 2
        }).format(amount);
    }

    /**
     * Formatea una fecha
     */
    formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString(CONFIG.LANGUAGE, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }

    /**
     * Formatea una fecha completa
     */
    formatFullDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString(CONFIG.LANGUAGE, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            weekday: 'long'
        });
    }

    /**
     * Obtiene el mes y año en formato legible
     */
    getMonthYear(year, month) {
        const date = new Date(year, month, 1);
        return date.toLocaleDateString(CONFIG.LANGUAGE, {
            month: 'long',
            year: 'numeric'
        });
    }

    /**
     * Genera un ID único
     */
    generateId(prefix = 'id') {
        return prefix + Date.now() + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Valida un email
     */
    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Redondea un número a 2 decimales
     */
    roundNumber(num, decimals = 2) {
        return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
    }

    /**
     * Calcula el porcentaje
     */
    calculatePercentage(value, total) {
        return total === 0 ? 0 : this.roundNumber((value / total) * 100);
    }

    /**
     * Obtiene el color contrario para texto
     */
    getContrastColor(hexColor) {
        const r = parseInt(hexColor.substr(1, 2), 16);
        const g = parseInt(hexColor.substr(3, 2), 16);
        const b = parseInt(hexColor.substr(5, 2), 16);
        
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128 ? '#000000' : '#FFFFFF';
    }

    /**
     * Copia texto al portapapeles
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            console.error('Error al copiar:', error);
            return false;
        }
    }

    /**
     * Débounce para funciones
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle para funciones
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Compara dos arrays
     */
    arraysEqual(arr1, arr2) {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    }

    /**
     * Clona un objeto profundamente
     */
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
}

export default new Utils();
