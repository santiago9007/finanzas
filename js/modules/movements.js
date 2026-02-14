/**
 * Módulo de Movimientos (Ingresos y Gastos)
 * Maneja CRUD de movimientos
 */

import db from './database.js';
import auth from './auth.js';

class Movements {
    /**
     * Obtiene todos los movimientos del usuario actual
     */
    getMovements(userId = null) {
        if (!userId) {
            userId = auth.isAdmin() ? null : auth.getCurrentUserId();
        }
        return db.getMovements(userId);
    }

    /**
     * Guarda un movimiento (crear o actualizar)
     */
    saveMovement(movement) {
        if (!movement.userId) {
            movement.userId = auth.getCurrentUserId();
        }
        
        // Buscar o crear categoría automáticamente
        const categories = db.getCategories(movement.userId);
        let category = categories.find(c => c.name.toLowerCase() === movement.categoryId.toLowerCase());
        
        if (!category) {
            // Crear categoría automáticamente
            const defaultColors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];
            category = {
                id: 'c' + Date.now(),
                userId: movement.userId,
                name: movement.categoryId,
                type: movement.type,
                color: defaultColors[Math.floor(Math.random() * defaultColors.length)]
            };
            db.saveCategory(category);
        }
        
        movement.categoryId = category.id;
        return db.saveMovement(movement);
    }

    /**
     * Elimina un movimiento
     */
    deleteMovement(id) {
        db.deleteMovement(id);
    }

    /**
     * Obtiene un movimiento por ID
     */
    getMovementById(id) {
        return this.getMovements().find(m => m.id === id);
    }

    /**
     * Filtra movimientos por criterios
     */
    filterMovements(filters = {}) {
        let movements = this.getMovements();
        const categories = db.getCategories(auth.getCurrentUserId());

        // Filtrar por tipo (income/expense)
        if (filters.type && filters.type !== 'all') {
            movements = movements.filter(m => m.type === filters.type);
        }

        // Filtrar por categoría (búsqueda por nombre)
        if (filters.category && filters.category.trim() !== '') {
            movements = movements.filter(m => {
                const cat = categories.find(c => c.id === m.categoryId);
                return cat && cat.name.toLowerCase().includes(filters.category.toLowerCase());
            });
        }

        // Filtrar por fecha
        if (filters.dateFrom) {
            movements = movements.filter(m => m.date >= filters.dateFrom);
        }
        if (filters.dateTo) {
            movements = movements.filter(m => m.date <= filters.dateTo);
        }

        // Ordenar por fecha descendente
        movements.sort((a, b) => new Date(b.date) - new Date(a.date));

        return movements;
    }

    /**
     * Calcula gastos mensuales por usuario
     */
    getMonthlyExpenses(userId, year, month) {
        const movements = db.getMovements(userId || auth.getCurrentUserId());
        const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`;
        
        return movements
            .filter(m => m.type === 'expense' && m.date.startsWith(monthStr))
            .reduce((sum, m) => sum + m.amount, 0);
    }

    /**
     * Calcula ingresos mensuales por usuario
     */
    getMonthlyIncome(userId, year, month) {
        const movements = db.getMovements(userId || auth.getCurrentUserId());
        const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`;
        
        return movements
            .filter(m => m.type === 'income' && m.date.startsWith(monthStr))
            .reduce((sum, m) => sum + m.amount, 0);
    }

    /**
     * Obtiene movimientos por categoría
     */
    getMovementsByCategory(categoryId) {
        return this.getMovements().filter(m => m.categoryId === categoryId);
    }

    /**
     * Calcula total de movimientos por categoría
     */
    getTotalByCategory(type = null) {
        const movements = this.getMovements();
        const categories = db.getCategories(auth.getCurrentUserId());
        const totals = {};

        movements.forEach(m => {
            if (type && m.type !== type) return;
            
            if (!totals[m.categoryId]) {
                totals[m.categoryId] = 0;
            }
            totals[m.categoryId] += m.amount;
        });

        return Object.entries(totals).map(([catId, amount]) => {
            const cat = categories.find(c => c.id === catId);
            return {
                id: catId,
                name: cat ? cat.name : 'Sin categoría',
                color: cat ? cat.color : '#6b7280',
                amount
            };
        });
    }
}

export default new Movements();
