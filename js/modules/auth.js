/**
 * Módulo de Autenticación
 * Maneja login, logout y autentificación de usuarios
 */

import db from './database.js';

class Auth {
    constructor() {
        this.currentUser = null;
    }

    /**
     * Obtiene el usuario actual
     */
    getCurrentUser() {
        return db.getCurrentUser();
    }

    /**
     * Verifica si hay sesión activa
     */
    isAuthenticated() {
        return this.getCurrentUser() !== null;
    }

    /**
     * Autentica un usuario
     */
    login(username, password, role) {
        const users = db.getUsers();
        const user = users.find(u => 
            (u.email === username || u.name === username) && 
            u.password === password && 
            u.role === role
        );

        if (user) {
            this.currentUser = user;
            db.setCurrentUser(user);
            return { success: true, user };
        }

        return { success: false, error: 'Usuario o contraseña incorrectos' };
    }

    /**
     * Cierra la sesión
     */
    logout() {
        this.currentUser = null;
        db.clearCurrentUser();
    }

    /**
     * Obtiene el ID del usuario actual
     */
    getCurrentUserId() {
        const user = this.getCurrentUser();
        return user ? user.id : null;
    }

    /**
     * Verifica si el usuario actual es admin
     */
    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    }
}

export default new Auth();
