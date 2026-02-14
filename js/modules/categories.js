/**
 * Módulo de Categorías
 * Maneja CRUD de categorías y gestión de tipos (ingreso/gasto)
 */

import db from './database.js';
import auth from './auth.js';

class Categories {
    /**
     * Obtiene todas las categorías del usuario actual
     */
    getCategories(userId = null) {
        if (!userId) {
            userId = auth.isAdmin() ? null : auth.getCurrentUserId();
        }
        return db.getCategories(userId);
    }

    /**
     * Guarda una categoría (crear o actualizar)
     */
    saveCategory(category) {
        if (!category.userId) {
            category.userId = auth.getCurrentUserId();
        }
        return db.saveCategory(category);
    }

    /**
     * Elimina una categoría
     */
    deleteCategory(id) {
        db.deleteCategory(id);
    }

    /**
     * Obtiene una categoría por ID
     */
    getCategoryById(id) {
        return db.getCategories().find(c => c.id === id);
    }

    /**
     * Obtiene todas las categorías por tipo (income/expense)
     */
    getCategoriesByType(type) {
        return this.getCategories().filter(c => c.type === type);
    }

    /**
     * Busca categorías por nombre
     */
    searchCategories(query) {
        return this.getCategories().filter(c => 
            c.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    /**
     * Obtiene la categoría más usada
     */
    getMostUsedCategory() {
        // Implementaremos esto cuando tengamos acceso a movimientos
        return null;
    }

    /**
     * Genera sugerencias de nombres de categorías
     */
    getSuggestions() {
        return [
            { name: 'Salario', type: 'income', color: '#10b981' },
            { name: 'Freelance', type: 'income', color: '#3b82f6' },
            { name: 'Alimentacion', type: 'expense', color: '#f59e0b' },
            { name: 'Transporte', type: 'expense', color: '#ef4444' },
            { name: 'Entretenimiento', type: 'expense', color: '#8b5cf6' },
            { name: 'Servicios', type: 'expense', color: '#06b6d4' },
            { name: 'Salud', type: 'expense', color: '#ef4444' },
            { name: 'Vivienda', type: 'expense', color: '#f59e0b' },
            { name: 'Ahorro', type: 'income', color: '#3b82f6' }
        ];
    }

    /**
     * Valida un nombre de categoría
     */
    validateCategoryName(name) {
        if (!name || name.trim().length === 0) {
            return { valid: false, error: 'El nombre no puede estar vacío' };
        }
        if (name.trim().length < 3) {
            return { valid: false, error: 'El nombre debe tener al menos 3 caracteres' };
        }
        if (name.trim().length > 50) {
            return { valid: false, error: 'El nombre no puede exceder 50 caracteres' };
        }
        return { valid: true };
    }
}

export default new Categories();
