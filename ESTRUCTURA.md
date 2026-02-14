# 📊 Guía Rápida de la Estructura Modular

## Árbol de Carpetas

```
sistema_financiero/
│
├── 📄 index.html                    # Archivo principal (HTML)
│   └── Contiene: Estructura HTML, Tailwind CSS config
│
├── 📂 css/
│   └── styles.css                  # Estilos personalizados (CSS puro)
│       └── Contiene: Animaciones, glassmorphism, variables
│
├── 📂 js/
│   └── 📂 modules/
│       ├── 📄 config.js           # ⚙️  Configuración centralizada
│       │   └── Exporta: CONFIG (constantes, colores, claves)
│       │
│       ├── 📄 database.js         # 💾 Base de datos (LocalStorage)
│       │   └── Métodos: get/save/delete para usuarios, movimientos, categorías
│       │
│       ├── 📄 auth.js            # 🔐 Autenticación
│       │   └── Métodos: login, logout, getCurrentUser, isAdmin
│       │
│       ├── 📄 movements.js       # 💰 Movimientos (ingresos/gastos)
│       │   └── Métodos: CRUD, filtros, cálculos mensuales
│       │
│       ├── 📄 categories.js      # 🏷️  Categorías
│       │   └── Métodos: CRUD, búsqueda, validación
│       │
│       ├── 📄 utils.js           # 🔧 Utilidades generales
│       │   └── Métodos: formato, validación, matemática
│       │
│       └── 📄 ui.js              # 🎨 Interfaz de usuario
│           └── Métodos: DOM, modales, notificaciones
│
└── 📄 README.md                     # Documentación completa
```

---

## 🔗 Dependencias entre Módulos

```
config.js (Sin dependencias)
   ↑
   ├─ database.js (Usa CONFIG)
   ├─ auth.js (Usa database, config)
   ├─ movements.js (Usa database, auth, ui)
   ├─ categories.js (Usa database, auth)
   ├─ utils.js (Usa CONFIG)
   └─ ui.js (Independiente)
```

---

## 📋 Responsabilidades de Cada Módulo

| Módulo | Responsabilidad | Métodos Principales |
|--------|-----------------|-------------------|
| **config.js** | Constantes y configuración | `CONFIG` objeto |
| **database.js** | CRUD de datos perseguidos | `get/save/delete` para todas entidades |
| **auth.js** | Autenticación y sesiones | `login()`, `logout()`, `isAuthenticated()` |
| **movements.js** | Lógica de movimientos | `getMovements()`, `filterMovements()`, `getTotalByCategory()` |
| **categories.js** | Lógica de categorías | `getCategories()`, `searchCategories()`, `validateCategoryName()` |
| **utils.js** | Funciones helper | `formatCurrency()`, `formatDate()`, `debounce()` |
| **ui.js** | Controlador de UI | `showToast()`, `navigateTo()`, `openModal()` |

---

## 🎯 Uso Básico por Caso

### Caso 1: Obtener movimientos del usuario actual
```javascript
import auth from './js/modules/auth.js';
import movements from './js/modules/movements.js';

const user = auth.getCurrentUser();
const userMovements = movements.getMovements(user.id);
console.log(userMovements);
```

### Caso 2: Guardar un nuevo movimiento
```javascript
import movements from './js/modules/movements.js';

const newMovement = {
    userId: 'u1',
    type: 'expense',
    description: 'Compra en supermercado',
    amount: 150,
    categoryId: 'Alimentación',  // Puede ser nombre nuevo o ID
    date: '2026-02-14'
};

movements.saveMovement(newMovement);
```

### Caso 3: Filtrar movimientos
```javascript
import movements from './js/modules/movements.js';

const filters = {
    type: 'expense',
    category: 'Salud',
    dateFrom: '2026-01-01',
    dateTo: '2026-02-28'
};

const filtered = movements.filterMovements(filters);
```

### Caso 4: Mostrar notificación
```javascript
import ui from './js/modules/ui.js';

ui.showToast('¡Éxito!', 'success', 3000);
ui.showToast('Error', 'error', 3000);
```

---

## 🧪 Patrones de Uso

### Patrón 1: Validación + Guardado
```javascript
import categories from './js/modules/categories.js';

const categoryName = 'Mi Nueva Categoría';
const validation = categories.validateCategoryName(categoryName);

if (validation.valid) {
    categories.saveCategory({
        name: categoryName,
        type: 'expense',
        color: '#10b981'
    });
} else {
    console.error(validation.error);
}
```

### Patrón 2: Búsqueda + Formato
```javascript
import movements from './js/modules/movements.js';
import utils from './js/modules/utils.js';

const expenses = movements.filterMovements({ type: 'expense' });

expenses.forEach(m => {
    console.log(`${m.description}: ${utils.formatCurrency(m.amount)}`);
});
```

### Patrón 3: Debounce en búsqueda
```javascript
import categories from './js/modules/categories.js';
import utils from './js/modules/utils.js';

const searchInput = document.getElementById('search');

const performSearch = (query) => {
    const results = categories.searchCategories(query);
    // Actualizar UI
};

const debouncedSearch = utils.debounce(performSearch, 300);
searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});
```

---

## ✅ Checklist de Incorporación de Nuevos Desarrolladores

- [ ] Entender la estructura de carpetas
- [ ] Leer el archivo de configuración (`config.js`)
- [ ] Familiarizarse con `database.js` para operaciones CRUD
- [ ] Aprender `auth.js` para manejo de usuarios
- [ ] Practicar con `movements.js` y `categories.js`
- [ ] Dominar `utils.js` para funciones comunes
- [ ] Usar `ui.js` para cualquier manipulación del DOM
- [ ] Probar importar y usar módulos en la consola

---

## 🚀 Cómo Agregar Una Nueva Función

### Ejemplo: Agregar función de "Duplicar Movimiento"

**1. Agregar método en `movements.js`:**
```javascript
duplicateMovement(id) {
    const original = this.getMovementById(id);
    if (!original) return null;
    
    const duplicate = { ...original };
    delete duplicate.id;  // Genera nuevo ID
    return this.saveMovement(duplicate);
}
```

**2. Usar en el HTML/JavaScript:**
```javascript
import movements from './js/modules/movements.js';

const duplicated = movements.duplicateMovement('m123');
ui.showToast('Movimiento duplicado');
```

---

## 💡 Tips y Mejores Prácticas

1. **Siempre valida entries**: Usa los métodos de validación antes de guardar
2. **Formatea para display**: Usa `utils.formatCurrency()` y `utils.formatDate()`
3. **Clon objetos grandes**: Usa `utils.deepClone()` para no mutar originals
4. **Debounce búsquedas**: Para inputs de búsqueda en tiempo real
5. **Centraliza constantes**: Agrega todas las constantes en `config.js`
6. **Usa singletons**: Importa cada módulo una sola vez

---

## 📖 Documentación Completa

Para documentación detallada de cada módulo, consulta `README.md`

**Creado**: 14 de febrero de 2026  
**Versión**: 1.0
