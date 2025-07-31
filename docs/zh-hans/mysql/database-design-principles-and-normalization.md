# 数据库设计原则和规范化

数据库设计是任何成功应用程序的基础。糟糕的数据库设计可能导致数据不一致、性能问题和维护噩梦。本教程涵盖基本的数据库设计原则和规范化技术，帮助您创建高效、可扩展和可维护的数据库。

## 什么是数据库设计？

数据库设计是将数据组织到表、列和关系中的过程，以高效地存储、检索和管理信息。良好的数据库设计确保：

- **数据完整性** - 准确和一致的数据
- **性能** - 快速查询执行
- **可扩展性** - 处理不断增长的数据量的能力
- **可维护性** - 易于修改和扩展
- **安全性** - 保护敏感信息

## 核心数据库设计原则

### 1. 识别实体和关系

**实体**是您的域中需要存储的对象或概念。**关系**定义实体之间的连接方式。

**示例：电子商务系统**
```
实体：
- 客户
- 产品
- 订单
- 分类
- 供应商

关系：
- 客户下订单
- 订单包含产品
- 产品属于分类
- 供应商提供产品
```

### 2. 选择适当的数据类型

为每列选择最合适的数据类型：

```sql
-- 好：适当的数据类型
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT UNSIGNED NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT
);

-- 坏：不适当的数据类型
CREATE TABLE products_bad (
    id VARCHAR(50),  -- 应该用 INT 以获得性能
    name TEXT,       -- VARCHAR 对短文本更高效
    price FLOAT,     -- DECIMAL 对金钱更准确
    stock_quantity DECIMAL(10,2), -- INT 适合数量
    is_active VARCHAR(10), -- BOOLEAN 更合适
    created_at VARCHAR(50) -- TIMESTAMP 更好地处理日期
);
```

### 3. 使用有意义的名称

为表和列选择描述性名称：

```sql
-- 好的命名
CREATE TABLE customer_orders (
    order_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    shipping_address VARCHAR(500),
    order_status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled')
);

-- 坏的命名
CREATE TABLE t1 (
    id INT PRIMARY KEY,
    c_id INT,
    dt DATE,
    amt DECIMAL(10, 2),
    addr VARCHAR(500),
    stat VARCHAR(20)
);
```

### 4. 避免冗余数据

不要在多个地方存储相同的信息：

```sql
-- 好：规范化设计
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

-- 坏：订单中的冗余客户数据
CREATE TABLE orders_bad (
    order_id INT PRIMARY KEY,
    customer_id INT,
    customer_name VARCHAR(100),  -- 冗余
    customer_email VARCHAR(100), -- 冗余
    customer_phone VARCHAR(20),  -- 冗余
    order_date DATE,
    total_amount DECIMAL(10, 2)
);
```

## 数据库规范化

规范化是组织数据以减少冗余和提高数据完整性的过程。它涉及将较大的表分解为较小的相关表。

### 第一范式（1NF）

**规则：**
- 每列包含原子（不可分割）值
- 每行是唯一的
- 没有重复组

**示例：**

```sql
-- 违反 1NF：一列中有多个值
CREATE TABLE employees_bad (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    skills VARCHAR(500) -- "Java, Python, SQL" - 不是原子的
);

-- 遵循 1NF：原子值
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

### 第二范式（2NF）

**规则：**
- 必须是 1NF
- 对复合主键没有部分依赖

**示例：**

```sql
-- 违反 2NF：部分依赖
CREATE TABLE order_items_bad (
    order_id INT,
    product_id INT,
    product_name VARCHAR(100),    -- 只依赖于 product_id
    product_price DECIMAL(10, 2), -- 只依赖于 product_id
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- 遵循 2NF：消除部分依赖
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

### 第三范式（3NF）

**规则：**
- 必须是 2NF
- 没有传递依赖

**示例：**

```sql
-- 违反 3NF：传递依赖
CREATE TABLE employees_bad (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    department_name VARCHAR(100),    -- 依赖于 department_id
    department_manager VARCHAR(100)  -- 依赖于 department_id
);

-- 遵循 3NF：消除传递依赖
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

### 博伊斯-科德范式（BCNF）

**规则：**
- 必须是 3NF
- 每个决定因子必须是候选键

**示例：**

```sql
-- 违反 BCNF
CREATE TABLE course_instructor_bad (
    course_id INT,
    instructor_id INT,
    instructor_name VARCHAR(100),
    room VARCHAR(50),
    PRIMARY KEY (course_id, instructor_id)
    -- instructor_name 依赖于 instructor_id（不是候选键）
);

-- 遵循 BCNF
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

## 实用数据库设计流程

### 步骤 1：需求分析

确定您需要存储的数据：

```
电子商务需求：
- 跟踪客户信息
- 管理产品目录
- 处理订单
- 处理付款
- 跟踪库存
- 管理供应商
- 生成报告
```

### 步骤 2：实体关系图（ERD）

创建数据库的可视化表示：

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

### 步骤 3：表创建

```sql
-- 客户表
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

-- 分类表
CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_category_id INT,
    FOREIGN KEY (parent_category_id) REFERENCES categories(category_id)
);

-- 供应商表
CREATE TABLE suppliers (
    supplier_id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT
);

-- 产品表
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

-- 订单表
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

-- 订单项表（连接表）
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

### 步骤 4：性能索引

```sql
-- 为频繁查询的列创建索引
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_supplier ON products(supplier_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- 为常见查询模式创建复合索引
CREATE INDEX idx_products_category_active ON products(category_id, is_active);
CREATE INDEX idx_orders_customer_status ON orders(customer_id, order_status);
```

## 高级设计模式

### 1. 审计跟踪模式

跟踪重要数据的更改：

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

### 2. 软删除模式

为审计目的保留已删除的记录：

```sql
ALTER TABLE products
ADD COLUMN deleted_at TIMESTAMP NULL,
ADD COLUMN deleted_by INT NULL;

-- 查询活跃产品
SELECT * FROM products WHERE deleted_at IS NULL;

-- 软删除产品
UPDATE products
SET deleted_at = CURRENT_TIMESTAMP, deleted_by = 1
WHERE product_id = 123;
```

### 3. 版本控制模式

跟踪记录的不同版本：

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

## 应避免的常见设计错误

### 1. 使用通用列名

```sql
-- 坏
CREATE TABLE orders (
    id INT PRIMARY KEY,
    value DECIMAL(10, 2),
    type VARCHAR(20),
    status VARCHAR(20)
);

-- 好
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    total_amount DECIMAL(10, 2),
    order_type ENUM('online', 'in-store', 'phone'),
    order_status ENUM('pending', 'processing', 'shipped', 'delivered')
);
```

### 2. 在一列中存储多个值

```sql
-- 坏
CREATE TABLE users (
    user_id INT PRIMARY KEY,
    permissions VARCHAR(500) -- "read,write,delete,admin"
);

-- 好
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

### 3. 不使用外键

```sql
-- 坏：没有引用完整性
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT  -- 没有外键约束
);

-- 好：强制引用完整性
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
```

### 4. 过度规范化

有时为了性能，反规范化是可以接受的：

```sql
-- 高度规范化（可能对报告较慢）
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- 为性能反规范化（存储计算值）
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    unit_price DECIMAL(10, 2),    -- 反规范化
    subtotal DECIMAL(12, 2),      -- 计算值
    PRIMARY KEY (order_id, product_id)
);
```

## 数据库设计最佳实践

### 1. 使用一致的命名约定

```sql
-- 表名：小写，复数
CREATE TABLE customers (...);
CREATE TABLE orders (...);
CREATE TABLE order_items (...);

-- 列名：小写，描述性
customer_id, first_name, created_at, is_active

-- 外键：reference_table_id
customer_id, product_id, category_id
```

### 2. 始终使用主键

```sql
-- 每个表都应该有主键
CREATE TABLE logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. 选择适当的存储引擎

```sql
-- InnoDB 用于事务数据（默认）
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    total_amount DECIMAL(10, 2)
) ENGINE=InnoDB;

-- MyISAM 用于读密集、非事务数据
CREATE TABLE search_logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    search_term VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM;
```

### 4. 为增长做计划

```sql
-- 为未来增长使用适当的数据类型
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,  -- BIGINT 用于大用户基数
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 分区大表
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

## 性能考虑

### 1. 索引策略

```sql
-- 为频繁查询的列创建索引
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(order_status);

-- 多列查询的复合索引
CREATE INDEX idx_products_category_active ON products(category_id, is_active);

-- 特定查询的覆盖索引
CREATE INDEX idx_orders_covering
ON orders(customer_id, order_date, total_amount);
```

### 2. 查询优化

```sql
-- 使用适当索引的高效查询
SELECT o.order_id, o.total_amount, c.first_name, c.last_name
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.order_status = 'pending'
  AND o.order_date >= '2024-01-01'
ORDER BY o.order_date DESC
LIMIT 50;
```

### 3. 归档策略

```sql
-- 将旧数据移动到归档表
CREATE TABLE orders_archive LIKE orders;

-- 归档超过 2 年的订单
INSERT INTO orders_archive
SELECT * FROM orders
WHERE order_date < DATE_SUB(NOW(), INTERVAL 2 YEAR);

DELETE FROM orders
WHERE order_date < DATE_SUB(NOW(), INTERVAL 2 YEAR);
```

## 结论

良好的数据库设计对于构建可扩展、可维护的应用程序至关重要。关键原则包括：

1. **适当规范化** - 在减少冗余的同时保持性能
2. **使用有意义的名称** - 使您的数据库自文档化
3. **选择正确的数据类型** - 优化存储和性能
4. **实现适当的关系** - 维护数据完整性
5. **为增长做计划** - 为未来需求设计
6. **策略性索引** - 平衡查询性能与写入性能

记住，数据库设计是迭代的。从坚实的基础开始，但准备好在应用程序发展时进行重构。定期审查和优化数据库模式将确保它在应用程序增长时继续有效地为您的应用程序服务。

## 下一步

掌握数据库设计原则后，考虑学习：

1. **高级索引策略** - 复合索引、覆盖索引
2. **数据库性能调优** - 查询优化、执行计划
3. **备份和恢复** - 数据保护策略
4. **复制和扩展** - 高可用性解决方案
5. **数据库安全** - 用户管理、访问控制

通过这些基础知识，您将具备为任何应用程序设计健壮、高效数据库的能力！