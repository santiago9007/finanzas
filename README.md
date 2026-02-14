# FinanzaPro - Guía de Estructura Modular

## 📁 Estructura del Proyecto

```
sistema_financiero/
├── index.html              # Archivo principal (HTML)
├── css/
│   └── styles.css         # Estilos globales
├── js/
│   └── modules/
│       ├── config.js      # Configuración y constantes
│       ├── database.js    # Gestión de LocalStorage
│       ├── auth.js        # Autenticación y sesiones
│       ├── movements.js   # Movimientos (ingresos/gastos)
│       ├── categories.js  # Gestión de categorías
│       ├── utils.js       # Funciones auxiliares
│       └── ui.js          # Interfaz de usuario
└── README.md              # Este archivo

```

## 📦 Módulos Disponibles

### `config.js`
Configuración centralizada del proyecto.

**Uso:**
```javascript
import { CONFIG } from './js/modules/config.js';

// Acceso a configuraciones
console.log(CONFIG.APP_NAME);          // 'FinanzaPro'
console.log(CONFIG.DEFAULT_CURRENCY);  // 'MXN'
console.log(CONFIG.DB_KEYS);           // Claves de localStorage
console.log(CONFIG.DEFAULT_COLORS);    // Array de colores
```

---

### `database.js`
Gestión centralizada de la base de datos (LocalStorage).

**Métodos principales:**
```javascript
import db from './js/modules/database.js';

// Inicializar
db.initialize();

// USUARIOS
db.getUsers();
db.saveUser(user);
db.deleteUser(id);

// MOVIMIENTOS
db.getMovements(userId);
db.saveMovement(movement);
db.deleteMovement(id);

// CATEGORÍAS
db.getCategories(userId);
db.saveCategory(category);
db.deleteCategory(id);

// PRESUPUESTOS
db.getBudgets(userId);
db.saveBudget(budget);
db.deleteBudget(id);

// USUARIO ACTUAL
db.getCurrentUser();
db.setCurrentUser(user);
db.clearCurrentUser();
```

---

### `auth.js`
Manejo de autenticación y sesiones.

**Métodos principales:**
```javascript
import auth from './js/modules/auth.js';

// Login
const result = auth.login(username, password, role);
if (result.success) {
    console.log(result.user);
}

// Logout
auth.logout();

// Estado actual
auth.isAuthenticated();      // boolean
auth.getCurrentUser();       // user object
auth.getCurrentUserId();     // string
auth.isAdmin();              // boolean
```

---

### `movements.js`
Gestión de movimientos (ingresos y gastos).

**Métodos principales:**
```javascript
import movements from './js/modules/movements.js';

// CRUD
movements.getMovements(userId);
movements.saveMovement(movement);
movements.deleteMovement(id);
movements.getMovementById(id);

// Búsqueda y filtros
movements.filterMovements(filters);  // { type, category, dateFrom, dateTo }
movements.getMovementsByCategory(categoryId);

// Cálculos
movements.getMonthlyExpenses(userId, year, month);
movements.getMonthlyIncome(userId, year, month);
movements.getTotalByCategory(type);
```

---

### `categories.js`
Gestión de categorías de movimientos.

**Métodos principales:**
```javascript
import categories from './js/modules/categories.js';

// CRUD
categories.getCategories(userId);
categories.saveCategory(category);
categories.deleteCategory(id);
categories.getCategoryById(id);

// Búsqueda
categories.getCategoriesByType(type);  // 'income' o 'expense'
categories.searchCategories(query);

// Validación
const validation = categories.validateCategoryName(name);
if (validation.valid) {
    // Procede
} else {
    console.error(validation.error);
}

// Sugerencias
categories.getSuggestions();
```

---

### `utils.js`
Funciones auxiliares y utilidades generales.

**Métodos principales:**
```javascript
import utils from './js/modules/utils.js';

// Formato
utils.formatCurrency(amount);           // '$1,234.56'
utils.formatDate(dateStr);              // '14 de feb de 2026'
utils.formatFullDate(dateStr);          // 'miércoles, 14 de febrero de 2026'
utils.getMonthYear(year, month);        // 'febrero 2026'

// Validación
utils.isValidEmail(email);              // boolean
utils.generateId(prefix);               // Genera ID único

// Matemática
utils.roundNumber(num, decimals);       // Redondea números
utils.calculatePercentage(value, total);// Calcula porcentaje

// Color
utils.getContrastColor(hexColor);       // '#000000' o '#FFFFFF'

// Portapapeles
await utils.copyToClipboard(text);

// Funciones de utilidad
utils.debounce(func, wait);             // Debounce
utils.throttle(func, limit);            // Throttle
utils.deepClone(obj);                   // Clonación profunda
utils.arraysEqual(arr1, arr2);          // Comparación de arrays
```

---

### `ui.js`
Manejo centralizado de la interfaz de usuario.

**Métodos principales:**
```javascript
import ui from './js/modules/ui.js';

// Notificaciones
ui.showToast(message, type, duration);  // type: 'success', 'error'

// Navegación
ui.navigateTo(viewName);
ui.openModal(modalId);
ui.closeModal(modalId);

// Manipulación de DOM
ui.setText(elementId, text);
ui.setHTML(elementId, html);
ui.getInputValue(inputId);
ui.setInputValue(inputId, value);
ui.clearForm(formId);

// Visibilidad
ui.show(elementId);
ui.hide(elementId);
ui.toggleVisibility(elementId);

// Clases y atributos
ui.addClass(elementId, className);
ui.removeClass(elementId, className);
ui.setAttribute(elementId, attr, value);
ui.getAttribute(elementId, attr);

// Elementos
ui.createElement(tag, className, innerHTML);

// Animaciones
ui.animate(elementId, animationClass, duration);
```

---

## 🚀 Cómo Importar y Usar los Módulos

En tu archivo `main.js` o en el HTML con módulos:

```javascript
// Importar los módulos necesarios
import db from './js/modules/database.js';
import auth from './js/modules/auth.js';
import movements from './js/modules/movements.js';
import categories from './js/modules/categories.js';
import utils from './js/modules/utils.js';
import ui from './js/modules/ui.js';
import { CONFIG } from './js/modules/config.js';

// Inicializar la aplicación
db.initialize();

// Usar los módulos
const user = auth.getCurrentUser();
const movements = movements.getMovements(user.id);
const formatted = utils.formatCurrency(1000);

// Mostrar notificación
ui.showToast('¡Operación exitosa!', 'success');
```

---

## 📝 Ventajas de esta Estructura

✅ **Modular**: Cada módulo es independiente y reutilizable  
✅ **Escalable**: Fácil de agregar nuevas funcionalidades  
✅ **Mantenible**: Código organizado y fácil de entender  
✅ **Testeable**: Cada módulo puede ser testeado aisladamente  
✅ **Reutilizable**: Importa solo lo que necesitas  
✅ **Separación de responsabilidades**: Cada módulo tiene una tarea específica  

---

## 🔄 Flujo de Datos

```
UI (index.html)
    ↓
auth.js (Verifica usuario)
    ↓
movements.js / categories.js (Lógica de negocio)
    ↓
database.js (Guarda/obtiene datos)
    ↓
LocalStorage (Almacenamiento físico)
```

---

## 🛠️ Próximos Pasos

1. **Crear `main.js`**: Archivo principal que inicializa la aplicación
2. **Crear `budgets.js`**: Módulo para presupuestos
3. **Crear `reports.js`**: Módulo para reportes y análisis
4. **Crear `validators.js`**: Validaciones centralizadas
5. **Agregar tests**: Testing unitario para cada módulo

---

## 📚 Notas Importantes

- Todos los módulos usan **ES6 modules** (import/export)
- Los módulos son **singletons** (una única instancia)
- Usa TypeScript en futuras versiones para mayor type safety
- Considera agregar eventos/listeners para comunicación entre módulos

---

**Versión**: 1.0  
**Última actualización**: 14 de febrero de 2026
