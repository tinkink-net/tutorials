# Datenbankdesign-Prinzipien und Normalisierung

Datenbankdesign ist die Grundlage jeder erfolgreichen Anwendung. Schlechtes Datenbankdesign kann zu Dateninkonsistenz, Leistungsproblemen und Wartungsalpträumen führen. Dieses Tutorial behandelt grundlegende Datenbankdesign-Prinzipien und Normalisierungstechniken, um Ihnen zu helfen, effiziente, skalierbare und wartbare Datenbanken zu erstellen.

## Was ist Datenbankdesign?

Datenbankdesign ist der Prozess der Organisation von Daten in Tabellen, Spalten und Beziehungen, die Informationen effizient speichern, abrufen und verwalten. Gutes Datenbankdesign gewährleistet:

- **Datenintegrität** - Genaue und konsistente Daten
- **Leistung** - Schnelle Abfrageausführung
- **Skalierbarkeit** - Fähigkeit, wachsende Datenmengen zu bewältigen
- **Wartbarkeit** - Einfach zu modifizieren und zu erweitern
- **Sicherheit** - Geschützte sensible Informationen

## Kernprinzipien des Datenbankdesigns

### 1. Identifizieren von Entitäten und Beziehungen

**Entitäten** sind Objekte oder Konzepte in Ihrer Domäne, die gespeichert werden müssen. **Beziehungen** definieren, wie Entitäten miteinander verbunden sind.

**Beispiel: E-Commerce-System**
```
Entitäten:
- Kunde
- Produkt
- Bestellung
- Kategorie
- Lieferant

Beziehungen:
- Kunde tätigt Bestellung
- Bestellung enthält Produkt
- Produkt gehört zu Kategorie
- Lieferant liefert Produkt
```

### 2. Auswahl geeigneter Datentypen

Wählen Sie den am besten geeigneten Datentyp für jede Spalte:

```sql
-- Gut: Angemessene Datentypen
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT UNSIGNED NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT
);

-- Schlecht: Ungeeignete Datentypen
CREATE TABLE products_bad (
    id VARCHAR(50),  -- Sollte INT für bessere Leistung sein
    name TEXT,       -- VARCHAR ist effizienter für kurzen Text
    price FLOAT,     -- DECIMAL ist genauer für Geldbeträge
    stock_quantity DECIMAL(10,2), -- INT ist angemessen für Mengen
    is_active VARCHAR(10), -- BOOLEAN ist angemessener
    created_at VARCHAR(50) -- TIMESTAMP behandelt Daten besser
);
```

### 3. Verwenden aussagekräftiger Namen

Wählen Sie beschreibende Namen für Tabellen und Spalten:

```sql
-- Gute Namensgebung
CREATE TABLE customer_orders (
    order_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    shipping_address VARCHAR(500),
    order_status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled')
);

-- Schlechte Namensgebung
CREATE TABLE t1 (
    id INT PRIMARY KEY,
    c_id INT,
    dt DATE,
    amt DECIMAL(10, 2),
    addr VARCHAR(500),
    stat VARCHAR(20)
);
```

### 4. Vermeiden redundanter Daten

Speichern Sie dieselbe Information nicht an mehreren Stellen:

```sql
-- Gut: Normalisiertes Design
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

-- Schlecht: Redundante Kundendaten in Bestellungen
CREATE TABLE orders_bad (
    order_id INT PRIMARY KEY,
    customer_id INT,
    customer_name VARCHAR(100),  -- Redundant
    customer_email VARCHAR(100), -- Redundant
    customer_phone VARCHAR(20),  -- Redundant
    order_date DATE,
    total_amount DECIMAL(10, 2)
);
```

## Datenbank-Normalisierung

Normalisierung ist der Prozess der Organisation von Daten, um Redundanz zu reduzieren und die Datenintegrität zu verbessern. Dabei werden größere Tabellen in kleinere, zusammenhängende Tabellen aufgeteilt.

### Erste Normalform (1NF)

**Regeln:**
- Jede Spalte enthält atomare (unteilbare) Werte
- Jede Zeile ist eindeutig
- Keine wiederholenden Gruppen

**Beispiel:**

```sql
-- Verletzt 1NF: Mehrere Werte in einer Spalte
CREATE TABLE employees_bad (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    skills VARCHAR(500) -- "Java, Python, SQL" - nicht atomar
);

-- Entspricht 1NF: Atomare Werte
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

### Zweite Normalform (2NF)

**Regeln:**
- Muss in 1NF sein
- Keine partiellen Abhängigkeiten von zusammengesetzten Primärschlüsseln

**Beispiel:**

```sql
-- Verletzt 2NF: Partielle Abhängigkeit
CREATE TABLE order_items_bad (
    order_id INT,
    product_id INT,
    product_name VARCHAR(100),    -- Hängt nur von product_id ab
    product_price DECIMAL(10, 2), -- Hängt nur von product_id ab
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- Entspricht 2NF: Entfernung partieller Abhängigkeiten
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

### Dritte Normalform (3NF)

**Regeln:**
- Muss in 2NF sein
- Keine transitiven Abhängigkeiten

**Beispiel:**

```sql
-- Verletzt 3NF: Transitive Abhängigkeit
CREATE TABLE employees_bad (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    department_name VARCHAR(100),    -- Hängt von department_id ab
    department_manager VARCHAR(100)  -- Hängt von department_id ab
);

-- Entspricht 3NF: Entfernung transitiver Abhängigkeiten
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

### Boyce-Codd Normalform (BCNF)

**Regeln:**
- Muss in 3NF sein
- Jeder Determinant muss ein Kandidatenschlüssel sein

**Beispiel:**

```sql
-- Verletzt BCNF
CREATE TABLE course_instructor_bad (
    course_id INT,
    instructor_id INT,
    instructor_name VARCHAR(100),
    room VARCHAR(50),
    PRIMARY KEY (course_id, instructor_id)
    -- instructor_name hängt von instructor_id ab (kein Kandidatenschlüssel)
);

-- Entspricht BCNF
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

## Praktischer Datenbankdesign-Prozess

### Schritt 1: Anforderungsanalyse

Identifizieren Sie, welche Daten gespeichert werden müssen:

```
E-Commerce-Anforderungen:
- Kundendaten verfolgen
- Produktkatalog verwalten
- Bestellungen verarbeiten
- Zahlungen abwickeln
- Lagerbestand verfolgen
- Lieferanten verwalten
- Berichte generieren
```

### Schritt 2: Entity-Relationship-Diagramm (ERD)

Erstellen Sie eine visuelle Darstellung Ihrer Datenbank:

```
Kunde (1) -----> (M) Bestellung (M) -----> (M) Produkt
   |                                           |
   |                                           |
   v                                           v
Adresse (M)                                Kategorie (1)
                                              |
                                              v
                                         Lieferant (1)
```

### Schritt 3: Tabellenerstellung

```sql
-- Kunden-Tabelle
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

-- Kategorien-Tabelle
CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_category_id INT,
    FOREIGN KEY (parent_category_id) REFERENCES categories(category_id)
);

-- Lieferanten-Tabelle
CREATE TABLE suppliers (
    supplier_id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT
);

-- Produkte-Tabelle
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

-- Bestellungen-Tabelle
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

-- Bestellpositionen-Tabelle (Verbindungstabelle)
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

### Schritt 4: Indizes für Leistung

```sql
-- Indizes für häufig abgefragte Spalten erstellen
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_supplier ON products(supplier_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- Zusammengesetzte Indizes für häufige Abfragemuster
CREATE INDEX idx_products_category_active ON products(category_id, is_active);
CREATE INDEX idx_orders_customer_status ON orders(customer_id, order_status);
```

## Fortgeschrittene Designmuster

### 1. Audit-Trail-Muster

Verfolgen Sie Änderungen an wichtigen Daten:

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

### 2. Soft-Delete-Muster

Behalten Sie gelöschte Datensätze für Prüfzwecke:

```sql
ALTER TABLE products
ADD COLUMN deleted_at TIMESTAMP NULL,
ADD COLUMN deleted_by INT NULL;

-- Abfrage aktiver Produkte
SELECT * FROM products WHERE deleted_at IS NULL;

-- Soft-Delete eines Produkts
UPDATE products
SET deleted_at = CURRENT_TIMESTAMP, deleted_by = 1
WHERE product_id = 123;
```

### 3. Versionierungsmuster

Verfolgen Sie verschiedene Versionen von Datensätzen:

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

## Häufige Designfehler, die vermieden werden sollten

### 1. Verwendung generischer Spaltennamen

```sql
-- Schlecht
CREATE TABLE orders (
    id INT PRIMARY KEY,
    value DECIMAL(10, 2),
    type VARCHAR(20),
    status VARCHAR(20)
);

-- Gut
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    total_amount DECIMAL(10, 2),
    order_type ENUM('online', 'in-store', 'phone'),
    order_status ENUM('pending', 'processing', 'shipped', 'delivered')
);
```

### 2. Speichern mehrerer Werte in einer Spalte

```sql
-- Schlecht
CREATE TABLE users (
    user_id INT PRIMARY KEY,
    permissions VARCHAR(500) -- "read,write,delete,admin"
);

-- Gut
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

### 3. Keine Verwendung von Fremdschlüsseln

```sql
-- Schlecht: Keine referenzielle Integrität
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT  -- Kein Fremdschlüssel-Constraint
);

-- Gut: Erzwungene referenzielle Integrität
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
```

### 4. Übernormalisierung

Manchmal ist Denormalisierung für die Leistung akzeptabel:

```sql
-- Hochgradig normalisiert (könnte für Berichte langsam sein)
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- Denormalisiert für Leistung (berechnete Werte speichern)
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    unit_price DECIMAL(10, 2),    -- Denormalisiert
    subtotal DECIMAL(12, 2),      -- Berechneter Wert
    PRIMARY KEY (order_id, product_id)
);
```

## Best Practices für Datenbankdesign

### 1. Verwenden Sie konsistente Namenskonventionen

```sql
-- Tabellennamen: Kleinbuchstaben, Plural
CREATE TABLE customers (...);
CREATE TABLE orders (...);
CREATE TABLE order_items (...);

-- Spaltennamen: Kleinbuchstaben, beschreibend
customer_id, first_name, created_at, is_active

-- Fremdschlüssel: reference_table_id
customer_id, product_id, category_id
```

### 2. Verwenden Sie immer Primärschlüssel

```sql
-- Jede Tabelle sollte einen Primärschlüssel haben
CREATE TABLE logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Wählen Sie geeignete Speicher-Engines

```sql
-- InnoDB für transaktionale Daten (Standard)
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    total_amount DECIMAL(10, 2)
) ENGINE=InnoDB;

-- MyISAM für leseintensive, nicht-transaktionale Daten
CREATE TABLE search_logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    search_term VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM;
```

### 4. Planen Sie für Wachstum

```sql
-- Verwenden Sie geeignete Datentypen für zukünftiges Wachstum
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,  -- BIGINT für große Benutzerbasen
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Partitionieren Sie große Tabellen
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

## Leistungsüberlegungen

### 1. Indexstrategie

```sql
-- Erstellen Sie Indizes für häufig abgefragte Spalten
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(order_status);

-- Zusammengesetzte Indizes für Abfragen mit mehreren Spalten
CREATE INDEX idx_products_category_active ON products(category_id, is_active);

-- Covering-Indizes für spezifische Abfragen
CREATE INDEX idx_orders_covering
ON orders(customer_id, order_date, total_amount);
```

### 2. Abfrageoptimierung

```sql
-- Effiziente Abfrage mit richtiger Indizierung
SELECT o.order_id, o.total_amount, c.first_name, c.last_name
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.order_status = 'pending'
  AND o.order_date >= '2024-01-01'
ORDER BY o.order_date DESC
LIMIT 50;
```

### 3. Archivierungsstrategie

```sql
-- Verschieben Sie alte Daten in Archivtabellen
CREATE TABLE orders_archive LIKE orders;

-- Archivieren Sie Bestellungen, die älter als 2 Jahre sind
INSERT INTO orders_archive
SELECT * FROM orders
WHERE order_date < DATE_SUB(NOW(), INTERVAL 2 YEAR);

DELETE FROM orders
WHERE order_date < DATE_SUB(NOW(), INTERVAL 2 YEAR);
```

## Fazit

Gutes Datenbankdesign ist entscheidend für den Aufbau skalierbarer, wartbarer Anwendungen. Zu den wichtigsten Prinzipien gehören:

1. **Angemessen normalisieren** - Reduzieren Sie Redundanz bei gleichzeitiger Aufrechterhaltung der Leistung
2. **Verwenden Sie aussagekräftige Namen** - Machen Sie Ihre Datenbank selbstdokumentierend
3. **Wählen Sie korrekte Datentypen** - Optimieren Sie Speicherung und Leistung
4. **Implementieren Sie richtige Beziehungen** - Erhalten Sie die Datenintegrität
5. **Planen Sie für Wachstum** - Entwerfen Sie für zukünftige Anforderungen
6. **Indizieren Sie strategisch** - Balancieren Sie Abfrageleistung mit Schreibleistung

Denken Sie daran, dass Datenbankdesign iterativ ist. Beginnen Sie mit einer soliden Grundlage, aber seien Sie bereit, Refactoring durchzuführen, wenn sich Ihre Anwendung weiterentwickelt. Regelmäßige Überprüfung und Optimierung Ihres Datenbankschemas stellt sicher, dass es Ihre Anwendung weiterhin effektiv unterstützt, während sie wächst.

## Nächste Schritte

Nach dem Beherrschen der Datenbankdesign-Prinzipien sollten Sie in Betracht ziehen, Folgendes zu lernen:

1. **Fortgeschrittene Indizierungsstrategien** - Zusammengesetzte Indizes, Covering-Indizes
2. **Datenbankleistungsoptimierung** - Abfrageoptimierung, Ausführungspläne
3. **Backup und Wiederherstellung** - Datenschutzstrategien
4. **Replikation und Skalierung** - Hochverfügbarkeitslösungen
5. **Datenbanksicherheit** - Benutzerverwaltung, Zugriffssteuerung

Mit diesen Grundlagen sind Sie gut gerüstet, um robuste, effiziente Datenbanken für jede Anwendung zu entwerfen!