/**
 * Módulo de Interfaz de Usuario (UI)
 * Maneja interacciones y actualizaciones del DOM
 */

import utils from './utils.js';

class UI {
    constructor() {
        this.currentView = 'dashboard';
    }

    /**
     * Muestra un toast de notificación
     */
    showToast(message, type = 'success', duration = 3000) {
        const toast = document.getElementById('toast');
        if (!toast) {
            console.warn('Toast element not found');
            return;
        }

        const icon = document.getElementById('toastIcon');
        const msg = document.getElementById('toastMessage');

        if (type === 'error') {
            icon.className = 'w-6 h-6 rounded-full bg-danger flex items-center justify-center';
            icon.innerHTML = '<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>';
        } else {
            icon.className = 'w-6 h-6 rounded-full bg-accent flex items-center justify-center';
            icon.innerHTML = '<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>';
        }

        msg.textContent = message;
        toast.classList.remove('hidden');

        setTimeout(() => {
            toast.classList.add('hidden');
        }, duration);
    }

    /**
     * Navega a una vista
     */
    navigateTo(viewName) {
        // Ocultar todas las vistas
        document.querySelectorAll('[id^="view-"]').forEach(view => {
            view.classList.add('hidden');
        });

        // Mostrar la vista seleccionada
        const view = document.getElementById(`view-${viewName}`);
        if (view) {
            view.classList.remove('hidden');
            this.currentView = viewName;

            // Actualizar navegación activa
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('bg-card');
                if (link.dataset.nav === viewName) {
                    link.classList.add('bg-card');
                }
            });
        }
    }

    /**
     * Abre un modal
     */
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    /**
     * Cierra un modal
     */
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    /**
     * Habilita o desabilita un botón
     */
    setButtonDisabled(buttonId, disabled) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.disabled = disabled;
            button.classList.toggle('opacity-50', disabled);
        }
    }

    /**
     * Actualiza el texto de un elemento
     */
    setText(elementId, text) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = text;
        }
    }

    /**
     * Actualiza el HTML de un elemento
     */
    setHTML(elementId, html) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
        }
    }

    /**
     * Obtiene el valor de un input
     */
    getInputValue(inputId) {
        const input = document.getElementById(inputId);
        return input ? input.value : '';
    }

    /**
     * Establece el valor de un input
     */
    setInputValue(inputId, value) {
        const input = document.getElementById(inputId);
        if (input) {
            input.value = value;
        }
    }

    /**
     * Limpia un formulario
     */
    clearForm(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.reset();
        }
    }

    /**
     * Muestra un elemento
     */
    show(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('hidden');
        }
    }

    /**
     * Oculta un elemento
     */
    hide(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.add('hidden');
        }
    }

    /**
     * Agrega una clase a un elemento
     */
    addClass(elementId, className) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.add(className);
        }
    }

    /**
     * Remueve una clase de un elemento
     */
    removeClass(elementId, className) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.remove(className);
        }
    }

    /**
     * Establece un atributo
     */
    setAttribute(elementId, attr, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.setAttribute(attr, value);
        }
    }

    /**
     * Obtiene un atributo
     */
    getAttribute(elementId, attr) {
        const element = document.getElementById(elementId);
        return element ? element.getAttribute(attr) : null;
    }

    /**
     * Crea un elemento
     */
    createElement(tag, className = '', innerHTML = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (innerHTML) element.innerHTML = innerHTML;
        return element;
    }

    /**
     * Realiza animación con CSS
     */
    animate(elementId, animationClass, duration = 500) {
        const element = document.getElementById(elementId);
        if (!element) return;

        element.classList.add(animationClass);
        
        setTimeout(() => {
            element.classList.remove(animationClass);
        }, duration);
    }
}

export default new UI();
