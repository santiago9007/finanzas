/**
 * Módulo de Base de Datos (LocalStorage)
 * Maneja todas las operaciones de almacenamiento de datos
 */

import { CONFIG } from './config.js';

class Database {
    constructor() {
        this.dbKeys = CONFIG.DB_KEYS;
    }

    // ==================-- INICIALIZACIÓN --==================
    
    initialize() {
        this.initializeUsers();
        this.initializeCategories();
        this.initializeMovements();
        this.initializeBudgets();
    }

    // ==================-- USUARIOS --==================
    
    getUsers() {
        const users = JSON.parse(localStorage.getItem(this.dbKeys.USERS) || '[]');
        return users;
    }

    saveUser(user) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.id === user.id);
        if (index >= 0) {
            users[index] = user;
        } else {
            user.id = 'u' + Date.now();
            users.push(user);
        }
        localStorage.setItem(this.dbKeys.USERS, JSON.stringify(users));
        return user;
    }

    deleteUser(id) {
        const users = this.getUsers().filter(u => u.id !== id);
        localStorage.setItem(this.dbKeys.USERS, JSON.stringify(users));
    }

    // ==================-- MOVIMIENTOS --==================
    
    getMovements(userId = null) {
        const movements = JSON.parse(localStorage.getItem(this.dbKeys.MOVEMENTS) || '[]');
        return userId ? movements.filter(m => m.userId === userId) : movements;
    }

    saveMovement(movement) {
        const movements = this.getMovements();
        const index = movements.findIndex(m => m.id === movement.id);
        if (index >= 0) {
            movements[index] = movement;
        } else {
            movement.id = 'm' + Date.now();
            movements.push(movement);
        }
        localStorage.setItem(this.dbKeys.MOVEMENTS, JSON.stringify(movements));
        return movement;
    }

    deleteMovement(id) {
        const movements = this.getMovements().filter(m => m.id !== id);
        localStorage.setItem(this.dbKeys.MOVEMENTS, JSON.stringify(movements));
    }

    // ==================-- CATEGORÍAS --==================
    
    getCategories(userId = null) {
        const categories = JSON.parse(localStorage.getItem(this.dbKeys.CATEGORIES) || '[]');
        return userId ? categories.filter(c => c.userId === userId) : categories;
    }

    saveCategory(category) {
        const categories = this.getCategories();
        const index = categories.findIndex(c => c.id === category.id);
        if (index >= 0) {
            categories[index] = category;
        } else {
            category.id = 'c' + Date.now();
            categories.push(category);
        }
        localStorage.setItem(this.dbKeys.CATEGORIES, JSON.stringify(categories));
        return category;
    }

    deleteCategory(id) {
        const categories = this.getCategories().filter(c => c.id !== id);
        localStorage.setItem(this.dbKeys.CATEGORIES, JSON.stringify(categories));
    }

    // ==================-- PRESUPUESTOS --==================
    
    getBudgets(userId = null) {
        const budgets = JSON.parse(localStorage.getItem(this.dbKeys.BUDGETS) || '[]');
        return userId ? budgets.filter(b => b.userId === userId) : budgets;
    }

    saveBudget(budget) {
        const budgets = this.getBudgets();
        const index = budgets.findIndex(b => b.id === budget.id);
        if (index >= 0) {
            budgets[index] = budget;
        } else {
            budget.id = 'b' + Date.now();
            budgets.push(budget);
        }
        localStorage.setItem(this.dbKeys.BUDGETS, JSON.stringify(budgets));
        return budget;
    }

    deleteBudget(id) {
        const budgets = this.getBudgets().filter(b => b.id !== id);
        localStorage.setItem(this.dbKeys.BUDGETS, JSON.stringify(budgets));
    }

    // ==================-- USUARIO ACTUAL --==================
    
    getCurrentUser() {
        const user = localStorage.getItem(this.dbKeys.CURRENT_USER);
        return user ? JSON.parse(user) : null;
    }

    setCurrentUser(user) {
        localStorage.setItem(this.dbKeys.CURRENT_USER, JSON.stringify(user));
    }

    clearCurrentUser() {
        localStorage.removeItem(this.dbKeys.CURRENT_USER);
    }

    // ==================-- INICIALIZACIÓN DE DATOS POR DEFECTO --==================
    
    initializeUsers() {
        if (localStorage.getItem(this.dbKeys.USERS)) return;
        
        const defaultUsers = [
            { id: 'u1', name: 'Juan Pérez', email: 'juan@example.com', password: '123456', role: 'user' },
            { id: 'u2', name: 'María García', email: 'maria@example.com', password: '123456', role: 'user' },
            { id: 'u3', name: 'Carlos López', email: 'carlos@example.com', password: '123456', role: 'user' },
            { id: 'admin', name: 'Administrador', email: 'admin@example.com', password: 'admin123', role: 'admin' }
        ];
        
        localStorage.setItem(this.dbKeys.USERS, JSON.stringify(defaultUsers));
    }

    initializeCategories() {
        if (localStorage.getItem(this.dbKeys.CATEGORIES)) return;
        
        const users = this.getUsers();
        const defaultCategories = [];
        
        users.forEach(user => {
            defaultCategories.push(
                { id: 'c1-' + user.id, name: 'Salario', type: 'income', color: '#10b981', userId: user.id },
                { id: 'c2-' + user.id, name: 'Freelance', type: 'income', color: '#3b82f6', userId: user.id },
                { id: 'c3-' + user.id, name: 'Alimentacion', type: 'expense', color: '#f59e0b', userId: user.id },
                { id: 'c4-' + user.id, name: 'Transporte', type: 'expense', color: '#ef4444', userId: user.id },
                { id: 'c5-' + user.id, name: 'Entretenimiento', type: 'expense', color: '#8b5cf6', userId: user.id },
                { id: 'c6-' + user.id, name: 'Servicios', type: 'expense', color: '#06b6d4', userId: user.id },
                { id: 'c11-' + user.id, name: 'Salud', type: 'expense', color: '#ef4444', userId: user.id },
                { id: 'c12-' + user.id, name: 'Salud', type: 'income', color: '#10b981', userId: user.id },
                { id: 'c13-' + user.id, name: 'Vivienda', type: 'expense', color: '#f59e0b', userId: user.id },
                { id: 'c14-' + user.id, name: 'Vivienda', type: 'income', color: '#06b6d4', userId: user.id },
                { id: 'c15-' + user.id, name: 'Ahorro', type: 'expense', color: '#8b5cf6', userId: user.id },
                { id: 'c16-' + user.id, name: 'Ahorro', type: 'income', color: '#3b82f6', userId: user.id }
            );
        });
        
        localStorage.setItem(this.dbKeys.CATEGORIES, JSON.stringify(defaultCategories));
    }

    initializeMovements() {
        if (localStorage.getItem(this.dbKeys.MOVEMENTS)) return;
        
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        const sampleMovements = [
            { id: 'm1', userId: 'u1', type: 'income', description: 'Salario Enero', amount: 3500, categoryId: 'c1-u1', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01` },
            { id: 'm2', userId: 'u1', type: 'income', description: 'Proyecto Freelance', amount: 800, categoryId: 'c2-u1', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-05` },
            { id: 'm3', userId: 'u1', type: 'expense', description: 'Supermercado', amount: 250, categoryId: 'c3-u1', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-03` },
        ];
        
        localStorage.setItem(this.dbKeys.MOVEMENTS, JSON.stringify(sampleMovements));
    }

    initializeBudgets() {
        if (localStorage.getItem(this.dbKeys.BUDGETS)) return;
        
        const defaultBudgets = [];
        localStorage.setItem(this.dbKeys.BUDGETS, JSON.stringify(defaultBudgets));
    }
}

export default new Database();
