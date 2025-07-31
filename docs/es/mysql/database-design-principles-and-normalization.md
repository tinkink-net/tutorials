# Principios de Diseño de Bases de Datos y Normalización

El diseño de bases de datos es el fundamento de cualquier aplicación exitosa. Un diseño deficiente puede provocar inconsistencias en los datos, problemas de rendimiento y pesadillas de mantenimiento. Este tutorial cubre los principios fundamentales de diseño de bases de datos y técnicas de normalización para ayudarte a crear bases de datos eficientes, escalables y mantenibles.

## ¿Qué es el Diseño de Bases de Datos?

El diseño de bases de datos es el proceso de organizar datos en tablas, columnas y relaciones que almacenan, recuperan y gestionan información de manera eficiente. Un buen diseño de base de datos garantiza:

- **Integridad de datos** - Datos precisos y consistentes
- **Rendimiento** - Ejecución rápida de consultas
- **Escalabilidad** - Capacidad para manejar volúmenes crecientes de datos
- **Mantenibilidad** - Fácil de modificar y extender
- **Seguridad** - Información sensible protegida

## Principios Fundamentales de Diseño de Bases de Datos

### 1. Identificar Entidades y Relaciones

Las **entidades** son objetos o conceptos en tu dominio que necesitan ser almacenados. Las **relaciones** definen cómo se conectan las entidades entre sí.

**Ejemplo: Sistema de Comercio Electrónico**
```
Entidades:
- Cliente
- Producto
- Pedido
- Categoría
- Proveedor

Relaciones:
- Cliente realiza Pedido
- Pedido contiene Producto
- Producto pertenece a Categoría
- Proveedor suministra Producto
```

### 2. Elegir Tipos de Datos Apropiados

Selecciona el tipo de dato más adecuado para cada columna:

```sql
-- Bueno: Tipos de datos apropiados
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT UNSIGNED NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT
);

-- Malo: Tipos de datos inapropiados
CREATE TABLE products_bad (
    id VARCHAR(50),  -- Debería ser INT para mejor rendimiento
    name TEXT,       -- VARCHAR es más eficiente para texto corto
    price FLOAT,     -- DECIMAL es más preciso para dinero
    stock_quantity DECIMAL(10,2), -- INT es apropiado para cantidades
    is_active VARCHAR(10), -- BOOLEAN es más apropiado
    created_at VARCHAR(50) -- TIMESTAMP maneja fechas mejor
);
```

### 3. Usar Nombres Significativos

Elige nombres descriptivos para tablas y columnas:

```sql
-- Buena nomenclatura
CREATE TABLE customer_orders (
    order_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    shipping_address VARCHAR(500),
    order_status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled')
);

-- Mala nomenclatura
CREATE TABLE t1 (
    id INT PRIMARY KEY,
    c_id INT,
    dt DATE,
    amt DECIMAL(10, 2),
    addr VARCHAR(500),
    stat VARCHAR(20)
);
```

### 4. Evitar Datos Redundantes

No almacenes la misma información en múltiples lugares:

```sql
-- Bueno: Diseño normalizado
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    total_amount DECIMAL(10, 2),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Malo: Datos de cliente redundantes en pedidos
CREATE TABLE orders_bad (
    order_id INT PRIMARY KEY,
    customer_id INT,
    customer_name VARCHAR(100),  -- Redundante
    customer_email VARCHAR(100), -- Redundante
    customer_phone VARCHAR(20),  -- Redundante
    order_date DATE,
    total_amount DECIMAL(10, 2)
);
```

## Normalización de Bases de Datos

La normalización es el proceso de organizar datos para reducir la redundancia y mejorar la integridad de los datos. Implica dividir tablas grandes en tablas más pequeñas relacionadas.

### Primera Forma Normal (1NF)

**Reglas:**
- Cada columna contiene valores atómicos (indivisibles)
- Cada fila es única
- No hay grupos repetitivos

**Ejemplo:**

```sql
-- Viola 1NF: Múltiples valores en una columna
CREATE TABLE employees_bad (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    skills VARCHAR(500) -- "Java, Python, SQL" - no atómico
);

-- Cumple 1NF: Valores atómicos
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE employee_skills (
    employee_id INT,
    skill VARCHAR(100),
    PRIMARY KEY (employee_id, skill),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);
```

### Segunda Forma Normal (2NF)

**Reglas:**
- Debe estar en 1NF
- No hay dependencias parciales en claves primarias compuestas

**Ejemplo:**

```sql
-- Viola 2NF: Dependencia parcial
CREATE TABLE order_items_bad (
    order_id INT,
    product_id INT,
    product_name VARCHAR(100),    -- Depende solo de product_id
    product_price DECIMAL(10, 2), -- Depende solo de product_id
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- Cumple 2NF: Elimina dependencias parciales
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    product_price DECIMAL(10, 2)
);

CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

### Tercera Forma Normal (3NF)

**Reglas:**
- Debe estar en 2NF
- No hay dependencias transitivas

**Ejemplo:**

```sql
-- Viola 3NF: Dependencia transitiva
CREATE TABLE employees_bad (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    department_name VARCHAR(100),    -- Depende de department_id
    department_manager VARCHAR(100)  -- Depende de department_id
);

-- Cumple 3NF: Elimina dependencias transitivas
CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(100),
    department_manager VARCHAR(100)
);

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);
```

### Forma Normal de Boyce-Codd (BCNF)

**Reglas:**
- Debe estar en 3NF
- Cada determinante debe ser una clave candidata

**Ejemplo:**

```sql
-- Viola BCNF
CREATE TABLE course_instructor_bad (
    course_id INT,
    instructor_id INT,
    instructor_name VARCHAR(100),
    room VARCHAR(50),
    PRIMARY KEY (course_id, instructor_id)
    -- instructor_name depende de instructor_id (no es una clave candidata)
);

-- Cumple BCNF
CREATE TABLE instructors (
    instructor_id INT PRIMARY KEY,
    instructor_name VARCHAR(100)
);

CREATE TABLE course_assignments (
    course_id INT,
    instructor_id INT,
    room VARCHAR(50),
    PRIMARY KEY (course_id, instructor_id),
    FOREIGN KEY (instructor_id) REFERENCES instructors(instructor_id)
);
```

## Proceso Práctico de Diseño de Bases de Datos

### Paso 1: Análisis de Requisitos

Identifica qué datos necesitas almacenar:

```
Requisitos de Comercio Electrónico:
- Seguimiento de información de clientes
- Gestión de catálogo de productos
- Procesamiento de pedidos
- Gestión de pagos
- Seguimiento de inventario
- Gestión de proveedores
- Generación de informes
```

### Paso 2: Diagrama Entidad-Relación (ERD)

Crea una representación visual de tu base de datos:

```
Cliente (1) -----> (M) Pedido (M) -----> (M) Producto
   |                                         |
   |                                         |
   v                                         v
Dirección (M)                            Categoría (1)
                                            |
                                            v
                                       Proveedor (1)
```

### Paso 3: Creación de Tablas

```sql
-- Tabla de clientes
CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de categorías
CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_category_id INT,
    FOREIGN KEY (parent_category_id) REFERENCES categories(category_id)
);

-- Tabla de proveedores
CREATE TABLE suppliers (
    supplier_id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT
);

-- Tabla de productos
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT UNSIGNED NOT NULL DEFAULT 0,
    category_id INT,
    supplier_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
);

-- Tabla de pedidos
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(12, 2) NOT NULL,
    order_status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    shipping_address TEXT,
    billing_address TEXT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Tabla de elementos de pedido (tabla de unión)
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(12, 2) NOT NULL,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

### Paso 4: Índices para Rendimiento

```sql
-- Crear índices para columnas consultadas frecuentemente
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_supplier ON products(supplier_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- Índices compuestos para patrones de consulta comunes
CREATE INDEX idx_products_category_active ON products(category_id, is_active);
CREATE INDEX idx_orders_customer_status ON orders(customer_id, order_status);
```

## Patrones de Diseño Avanzados

### 1. Patrón de Registro de Auditoría

Seguimiento de cambios en datos importantes:

```sql
CREATE TABLE product_audit (
    audit_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    old_price DECIMAL(10, 2),
    new_price DECIMAL(10, 2),
    changed_by INT,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    change_reason VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (changed_by) REFERENCES users(user_id)
);
```

### 2. Patrón de Eliminación Suave

Mantener registros eliminados para fines de auditoría:

```sql
ALTER TABLE products
ADD COLUMN deleted_at TIMESTAMP NULL,
ADD COLUMN deleted_by INT NULL;

-- Consultar productos activos
SELECT * FROM products WHERE deleted_at IS NULL;

-- Eliminación suave de un producto
UPDATE products
SET deleted_at = CURRENT_TIMESTAMP, deleted_by = 1
WHERE product_id = 123;
```

### 3. Patrón de Versionado

Seguimiento de diferentes versiones de registros:

```sql
CREATE TABLE product_versions (
    version_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    version_number INT NOT NULL,
    product_name VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2),
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    UNIQUE KEY unique_current_version (product_id, is_current)
);
```

## Errores Comunes de Diseño a Evitar

### 1. Usar Nombres de Columnas Genéricos

```sql
-- Malo
CREATE TABLE orders (
    id INT PRIMARY KEY,
    value DECIMAL(10, 2),
    type VARCHAR(20),
    status VARCHAR(20)
);

-- Bueno
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    total_amount DECIMAL(10, 2),
    order_type ENUM('online', 'in-store', 'phone'),
    order_status ENUM('pending', 'processing', 'shipped', 'delivered')
);
```

### 2. Almacenar Múltiples Valores en Una Columna

```sql
-- Malo
CREATE TABLE users (
    user_id INT PRIMARY KEY,
    permissions VARCHAR(500) -- "read,write,delete,admin"
);

-- Bueno
CREATE TABLE users (
    user_id INT PRIMARY KEY,
    username VARCHAR(50)
);

CREATE TABLE permissions (
    permission_id INT PRIMARY KEY,
    permission_name VARCHAR(50)
);

CREATE TABLE user_permissions (
    user_id INT,
    permission_id INT,
    PRIMARY KEY (user_id, permission_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (permission_id) REFERENCES permissions(permission_id)
);
```

### 3. No Usar Claves Foráneas

```sql
-- Malo: Sin integridad referencial
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT  -- Sin restricción de clave foránea
);

-- Bueno: Integridad referencial aplicada
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
```

### 4. Sobre-Normalización

A veces la desnormalización es aceptable para mejorar el rendimiento:

```sql
-- Altamente normalizado (podría ser lento para informes)
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- Desnormalizado para rendimiento (almacenar valores calculados)
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    unit_price DECIMAL(10, 2),    -- Desnormalizado
    subtotal DECIMAL(12, 2),      -- Valor calculado
    PRIMARY KEY (order_id, product_id)
);
```

## Mejores Prácticas de Diseño de Bases de Datos

### 1. Usar Convenciones de Nomenclatura Consistentes

```sql
-- Nombres de tablas: minúsculas, plural
CREATE TABLE customers (...);
CREATE TABLE orders (...);
CREATE TABLE order_items (...);

-- Nombres de columnas: minúsculas, descriptivos
customer_id, first_name, created_at, is_active

-- Claves foráneas: reference_table_id
customer_id, product_id, category_id
```

### 2. Siempre Usar Claves Primarias

```sql
-- Cada tabla debe tener una clave primaria
CREATE TABLE logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Elegir Motores de Almacenamiento Apropiados

```sql
-- InnoDB para datos transaccionales (predeterminado)
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    total_amount DECIMAL(10, 2)
) ENGINE=InnoDB;

-- MyISAM para datos no transaccionales con muchas lecturas
CREATE TABLE search_logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    search_term VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM;
```

### 4. Planificar para el Crecimiento

```sql
-- Usar tipos de datos apropiados para crecimiento futuro
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,  -- BIGINT para grandes bases de usuarios
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Particionar tablas grandes
CREATE TABLE user_activity_logs (
    log_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    activity_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
PARTITION BY RANGE (YEAR(created_at)) (
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p2025 VALUES LESS THAN (2026)
);
```

## Consideraciones de Rendimiento

### 1. Estrategia de Indexación

```sql
-- Crear índices para columnas consultadas frecuentemente
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(order_status);

-- Índices compuestos para consultas de múltiples columnas
CREATE INDEX idx_products_category_active ON products(category_id, is_active);

-- Índices de cobertura para consultas específicas
CREATE INDEX idx_orders_covering
ON orders(customer_id, order_date, total_amount);
```

### 2. Optimización de Consultas

```sql
-- Consulta eficiente con indexación adecuada
SELECT o.order_id, o.total_amount, c.first_name, c.last_name
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.order_status = 'pending'
  AND o.order_date >= '2024-01-01'
ORDER BY o.order_date DESC
LIMIT 50;
```

### 3. Estrategia de Archivado

```sql
-- Mover datos antiguos a tablas de archivo
CREATE TABLE orders_archive LIKE orders;

-- Archivar pedidos con más de 2 años de antigüedad
INSERT INTO orders_archive
SELECT * FROM orders
WHERE order_date < DATE_SUB(NOW(), INTERVAL 2 YEAR);

DELETE FROM orders
WHERE order_date < DATE_SUB(NOW(), INTERVAL 2 YEAR);
```

## Conclusión

Un buen diseño de base de datos es crucial para construir aplicaciones escalables y mantenibles. Los principios clave incluyen:

1. **Normalizar adecuadamente** - Reducir la redundancia manteniendo el rendimiento
2. **Usar nombres significativos** - Hacer que tu base de datos sea autodocumentada
3. **Elegir tipos de datos correctos** - Optimizar almacenamiento y rendimiento
4. **Implementar relaciones adecuadas** - Mantener la integridad de los datos
5. **Planificar para el crecimiento** - Diseñar para requisitos futuros
6. **Indexar estratégicamente** - Equilibrar rendimiento de consultas con rendimiento de escritura

Recuerda que el diseño de bases de datos es iterativo. Comienza con una base sólida, pero prepárate para refactorizar a medida que tu aplicación evoluciona. La revisión y optimización regular de tu esquema de base de datos asegurará que continúe sirviendo a tu aplicación de manera efectiva a medida que crece.

## Próximos Pasos

Después de dominar los principios de diseño de bases de datos, considera aprender:

1. **Estrategias avanzadas de indexación** - Índices compuestos, índices de cobertura
2. **Ajuste de rendimiento de bases de datos** - Optimización de consultas, planes de ejecución
3. **Respaldo y recuperación** - Estrategias de protección de datos
4. **Replicación y escalado** - Soluciones de alta disponibilidad
5. **Seguridad de bases de datos** - Gestión de usuarios, control de acceso

¡Con estos fundamentos, estarás bien equipado para diseñar bases de datos robustas y eficientes para cualquier aplicación!