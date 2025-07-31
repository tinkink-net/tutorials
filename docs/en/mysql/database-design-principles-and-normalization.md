# Database Design Principles and Normalization

Database design is the foundation of any successful application. Poor database design can lead to data inconsistency, performance issues, and maintenance nightmares. This tutorial covers fundamental database design principles and normalization techniques to help you create efficient, scalable, and maintainable databases.

## What is Database Design?

Database design is the process of organizing data into tables, columns, and relationships that efficiently store, retrieve, and manage information. Good database design ensures:

- **Data integrity** - Accurate and consistent data
- **Performance** - Fast query execution
- **Scalability** - Ability to handle growing data volumes
- **Maintainability** - Easy to modify and extend
- **Security** - Protected sensitive information

## Core Database Design Principles

### 1. Identify Entities and Relationships

**Entities** are objects or concepts in your domain that need to be stored. **Relationships** define how entities connect to each other.

**Example: E-commerce System**
```
Entities:
- Customer
- Product
- Order
- Category
- Supplier

Relationships:
- Customer places Order
- Order contains Product
- Product belongs to Category
- Supplier supplies Product
```

### 2. Choose Appropriate Data Types

Select the most suitable data type for each column:

```sql
-- Good: Appropriate data types
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT UNSIGNED NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT
);

-- Bad: Inappropriate data types
CREATE TABLE products_bad (
    id VARCHAR(50),  -- Should be INT for performance
    name TEXT,       -- VARCHAR is more efficient for short text
    price FLOAT,     -- DECIMAL is more accurate for money
    stock_quantity DECIMAL(10,2), -- INT is appropriate for quantities
    is_active VARCHAR(10), -- BOOLEAN is more appropriate
    created_at VARCHAR(50) -- TIMESTAMP handles dates better
);
```

### 3. Use Meaningful Names

Choose descriptive names for tables and columns:

```sql
-- Good naming
CREATE TABLE customer_orders (
    order_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    shipping_address VARCHAR(500),
    order_status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled')
);

-- Bad naming
CREATE TABLE t1 (
    id INT PRIMARY KEY,
    c_id INT,
    dt DATE,
    amt DECIMAL(10, 2),
    addr VARCHAR(500),
    stat VARCHAR(20)
);
```

### 4. Avoid Redundant Data

Don't store the same information in multiple places:

```sql
-- Good: Normalized design
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

-- Bad: Redundant customer data in orders
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

## Database Normalization

Normalization is the process of organizing data to reduce redundancy and improve data integrity. It involves dividing larger tables into smaller, related tables.

### First Normal Form (1NF)

**Rules:**
- Each column contains atomic (indivisible) values
- Each row is unique
- No repeating groups

**Example:**

```sql
-- Violates 1NF: Multiple values in one column
CREATE TABLE employees_bad (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    skills VARCHAR(500) -- "Java, Python, SQL" - not atomic
);

-- Follows 1NF: Atomic values
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

### Second Normal Form (2NF)

**Rules:**
- Must be in 1NF
- No partial dependencies on composite primary keys

**Example:**

```sql
-- Violates 2NF: Partial dependency
CREATE TABLE order_items_bad (
    order_id INT,
    product_id INT,
    product_name VARCHAR(100),    -- Depends only on product_id
    product_price DECIMAL(10, 2), -- Depends only on product_id
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- Follows 2NF: Remove partial dependencies
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

### Third Normal Form (3NF)

**Rules:**
- Must be in 2NF
- No transitive dependencies

**Example:**

```sql
-- Violates 3NF: Transitive dependency
CREATE TABLE employees_bad (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    department_name VARCHAR(100),    -- Depends on department_id
    department_manager VARCHAR(100)  -- Depends on department_id
);

-- Follows 3NF: Remove transitive dependencies
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

### Boyce-Codd Normal Form (BCNF)

**Rules:**
- Must be in 3NF
- Every determinant must be a candidate key

**Example:**

```sql
-- Violates BCNF
CREATE TABLE course_instructor_bad (
    course_id INT,
    instructor_id INT,
    instructor_name VARCHAR(100),
    room VARCHAR(50),
    PRIMARY KEY (course_id, instructor_id)
    -- instructor_name depends on instructor_id (not a candidate key)
);

-- Follows BCNF
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

## Practical Database Design Process

### Step 1: Requirements Analysis

Identify what data you need to store:

```
E-commerce Requirements:
- Track customer information
- Manage product catalog
- Process orders
- Handle payments
- Track inventory
- Manage suppliers
- Generate reports
```

### Step 2: Entity-Relationship Diagram (ERD)

Create a visual representation of your database:

```
Customer (1) -----> (M) Order (M) -----> (M) Product
   |                                         |
   |                                         |
   v                                         v
Address (M)                              Category (1)
                                            |
                                            v
                                       Supplier (1)
```

### Step 3: Table Creation

```sql
-- Customers table
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

-- Categories table
CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_category_id INT,
    FOREIGN KEY (parent_category_id) REFERENCES categories(category_id)
);

-- Suppliers table
CREATE TABLE suppliers (
    supplier_id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT
);

-- Products table
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

-- Orders table
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

-- Order items table (junction table)
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

### Step 4: Indexes for Performance

```sql
-- Create indexes for frequently queried columns
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_supplier ON products(supplier_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- Composite indexes for common query patterns
CREATE INDEX idx_products_category_active ON products(category_id, is_active);
CREATE INDEX idx_orders_customer_status ON orders(customer_id, order_status);
```

## Advanced Design Patterns

### 1. Audit Trail Pattern

Track changes to important data:

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

### 2. Soft Delete Pattern

Keep deleted records for audit purposes:

```sql
ALTER TABLE products
ADD COLUMN deleted_at TIMESTAMP NULL,
ADD COLUMN deleted_by INT NULL;

-- Query active products
SELECT * FROM products WHERE deleted_at IS NULL;

-- Soft delete a product
UPDATE products
SET deleted_at = CURRENT_TIMESTAMP, deleted_by = 1
WHERE product_id = 123;
```

### 3. Versioning Pattern

Track different versions of records:

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

## Common Design Mistakes to Avoid

### 1. Using Generic Column Names

```sql
-- Bad
CREATE TABLE orders (
    id INT PRIMARY KEY,
    value DECIMAL(10, 2),
    type VARCHAR(20),
    status VARCHAR(20)
);

-- Good
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    total_amount DECIMAL(10, 2),
    order_type ENUM('online', 'in-store', 'phone'),
    order_status ENUM('pending', 'processing', 'shipped', 'delivered')
);
```

### 2. Storing Multiple Values in One Column

```sql
-- Bad
CREATE TABLE users (
    user_id INT PRIMARY KEY,
    permissions VARCHAR(500) -- "read,write,delete,admin"
);

-- Good
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

### 3. Not Using Foreign Keys

```sql
-- Bad: No referential integrity
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT  -- No foreign key constraint
);

-- Good: Enforced referential integrity
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
```

### 4. Over-Normalization

Sometimes denormalization is acceptable for performance:

```sql
-- Highly normalized (might be slow for reporting)
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- Denormalized for performance (store calculated values)
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    unit_price DECIMAL(10, 2),    -- Denormalized
    subtotal DECIMAL(12, 2),      -- Calculated value
    PRIMARY KEY (order_id, product_id)
);
```

## Database Design Best Practices

### 1. Use Consistent Naming Conventions

```sql
-- Table names: lowercase, plural
CREATE TABLE customers (...);
CREATE TABLE orders (...);
CREATE TABLE order_items (...);

-- Column names: lowercase, descriptive
customer_id, first_name, created_at, is_active

-- Foreign keys: reference_table_id
customer_id, product_id, category_id
```

### 2. Always Use Primary Keys

```sql
-- Every table should have a primary key
CREATE TABLE logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Choose Appropriate Storage Engines

```sql
-- InnoDB for transactional data (default)
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    total_amount DECIMAL(10, 2)
) ENGINE=InnoDB;

-- MyISAM for read-heavy, non-transactional data
CREATE TABLE search_logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    search_term VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM;
```

### 4. Plan for Growth

```sql
-- Use appropriate data types for future growth
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,  -- BIGINT for large user bases
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Partition large tables
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

## Performance Considerations

### 1. Index Strategy

```sql
-- Create indexes for frequently queried columns
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(order_status);

-- Composite indexes for multi-column queries
CREATE INDEX idx_products_category_active ON products(category_id, is_active);

-- Covering indexes for specific queries
CREATE INDEX idx_orders_covering
ON orders(customer_id, order_date, total_amount);
```

### 2. Query Optimization

```sql
-- Efficient query with proper indexing
SELECT o.order_id, o.total_amount, c.first_name, c.last_name
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.order_status = 'pending'
  AND o.order_date >= '2024-01-01'
ORDER BY o.order_date DESC
LIMIT 50;
```

### 3. Archiving Strategy

```sql
-- Move old data to archive tables
CREATE TABLE orders_archive LIKE orders;

-- Archive orders older than 2 years
INSERT INTO orders_archive
SELECT * FROM orders
WHERE order_date < DATE_SUB(NOW(), INTERVAL 2 YEAR);

DELETE FROM orders
WHERE order_date < DATE_SUB(NOW(), INTERVAL 2 YEAR);
```

## Conclusion

Good database design is crucial for building scalable, maintainable applications. Key principles include:

1. **Normalize appropriately** - Reduce redundancy while maintaining performance
2. **Use meaningful names** - Make your database self-documenting
3. **Choose correct data types** - Optimize storage and performance
4. **Implement proper relationships** - Maintain data integrity
5. **Plan for growth** - Design for future requirements
6. **Index strategically** - Balance query performance with write performance

Remember that database design is iterative. Start with a solid foundation, but be prepared to refactor as your application evolves. Regular review and optimization of your database schema will ensure it continues to serve your application effectively as it grows.

## Next Steps

After mastering database design principles, consider learning:

1. **Advanced indexing strategies** - Composite indexes, covering indexes
2. **Database performance tuning** - Query optimization, execution plans
3. **Backup and recovery** - Data protection strategies
4. **Replication and scaling** - High availability solutions
5. **Database security** - User management, access control

With these fundamentals, you'll be well-equipped to design robust, efficient databases for any application!
