/**
 * Configuración del Sistema Financiero
 */

export const CONFIG = {
    APP_NAME: 'FinanzaPro',
    DEFAULT_CURRENCY: 'MXN',
    LANGUAGE: 'es-MX',
    
    // Base de datos
    DB_KEYS: {
        USERS: 'finanzapro_users',
        MOVEMENTS: 'finanzapro_movements',
        CATEGORIES: 'finanzapro_categories',
        BUDGETS: 'finanzapro_budgets',
        CURRENT_USER: 'finanzapro_current_user'
    },
    
    // Colores por defecto
    DEFAULT_COLORS: [
        '#10b981', // Verde
        '#3b82f6', // Azul
        '#f59e0b', // Naranja
        '#ef4444', // Rojo
        '#8b5cf6', // Púrpura
        '#06b6d4', // Cian
        '#ec4899'  // Rosa
    ],
    
    // Estados de movimientos
    MOVEMENT_TYPES: {
        INCOME: 'income',
        EXPENSE: 'expense'
    },
    
    // Estados de usuario
    USER_ROLES: {
        ADMIN: 'admin',
        USER: 'user'
    }
};

export default CONFIG;
