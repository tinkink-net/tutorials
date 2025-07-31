# 資料庫設計原則和規範化

資料庫設計是任何成功應用程式的基礎。糟糕的資料庫設計可能導致資料不一致、效能問題和維護噩夢。本教程涵蓋基本的資料庫設計原則和規範化技術，幫助您創建高效、可擴展和可維護的資料庫。

## 什麼是資料庫設計？

資料庫設計是將資料組織到表、列和關係中的過程，以高效地存儲、檢索和管理資訊。良好的資料庫設計確保：

- **資料完整性** - 準確和一致的資料
- **效能** - 快速查詢執行
- **可擴展性** - 處理不斷增長的資料量的能力
- **可維護性** - 易於修改和擴展
- **安全性** - 保護敏感資訊

## 核心資料庫設計原則

### 1. 識別實體和關係

**實體**是您的域中需要存儲的對象或概念。**關係**定義實體之間的連接方式。

**示例：電子商務系統**
```
實體：
- 客戶
- 產品
- 訂單
- 分類
- 供應商

關係：
- 客戶下訂單
- 訂單包含產品
- 產品屬於分類
- 供應商提供產品
```

### 2. 選擇適當的資料類型

為每列選擇最合適的資料類型：

```sql
-- 好：適當的資料類型
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT UNSIGNED NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT
);

-- 壞：不適當的資料類型
CREATE TABLE products_bad (
    id VARCHAR(50),  -- 應該用 INT 以獲得效能
    name TEXT,       -- VARCHAR 對短文本更高效
    price FLOAT,     -- DECIMAL 對金錢更準確
    stock_quantity DECIMAL(10,2), -- INT 適合數量
    is_active VARCHAR(10), -- BOOLEAN 更合適
    created_at VARCHAR(50) -- TIMESTAMP 更好地處理日期
);
```

### 3. 使用有意義的名稱

為表和列選擇描述性名稱：

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

-- 壞的命名
CREATE TABLE t1 (
    id INT PRIMARY KEY,
    c_id INT,
    dt DATE,
    amt DECIMAL(10, 2),
    addr VARCHAR(500),
    stat VARCHAR(20)
);
```

### 4. 避免冗餘資料

不要在多個地方存儲相同的資訊：

```sql
-- 好：規範化設計
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

-- 壞：訂單中的冗餘客戶資料
CREATE TABLE orders_bad (
    order_id INT PRIMARY KEY,
    customer_id INT,
    customer_name VARCHAR(100),  -- 冗餘
    customer_email VARCHAR(100), -- 冗餘
    customer_phone VARCHAR(20),  -- 冗餘
    order_date DATE,
    total_amount DECIMAL(10, 2)
);
```

## 資料庫規範化

規範化是組織資料以減少冗餘和提高資料完整性的過程。它涉及將較大的表分解為較小的相關表。

### 第一範式（1NF）

**規則：**
- 每列包含原子（不可分割）值
- 每行是唯一的
- 沒有重複組

**示例：**

```sql
-- 違反 1NF：一列中有多個值
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

### 第二範式（2NF）

**規則：**
- 必須是 1NF
- 對複合主鍵沒有部分依賴

**示例：**

```sql
-- 違反 2NF：部分依賴
CREATE TABLE order_items_bad (
    order_id INT,
    product_id INT,
    product_name VARCHAR(100),    -- 只依賴於 product_id
    product_price DECIMAL(10, 2), -- 只依賴於 product_id
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- 遵循 2NF：消除部分依賴
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

### 第三範式（3NF）

**規則：**
- 必須是 2NF
- 沒有傳遞依賴

**示例：**

```sql
-- 違反 3NF：傳遞依賴
CREATE TABLE employees_bad (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    department_name VARCHAR(100),    -- 依賴於 department_id
    department_manager VARCHAR(100)  -- 依賴於 department_id
);

-- 遵循 3NF：消除傳遞依賴
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

### 博伊斯-科德範式（BCNF）

**規則：**
- 必須是 3NF
- 每個決定因子必須是候選鍵

**示例：**

```sql
-- 違反 BCNF
CREATE TABLE course_instructor_bad (
    course_id INT,
    instructor_id INT,
    instructor_name VARCHAR(100),
    room VARCHAR(50),
    PRIMARY KEY (course_id, instructor_id)
    -- instructor_name 依賴於 instructor_id（不是候選鍵）
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

## 實用資料庫設計流程

### 步驟 1：需求分析

確定您需要存儲的資料：

```
電子商務需求：
- 跟蹤客戶資訊
- 管理產品目錄
- 處理訂單
- 處理付款
- 跟蹤庫存
- 管理供應商
- 生成報告
```

### 步驟 2：實體關係圖（ERD）

創建資料庫的可視化表示：

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

### 步驟 3：表創建

```sql
-- 客戶表
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

-- 分類表
CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_category_id INT,
    FOREIGN KEY (parent_category_id) REFERENCES categories(category_id)
);

-- 供應商表
CREATE TABLE suppliers (
    supplier_id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT
);

-- 產品表
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

-- 訂單表
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

-- 訂單項表（連接表）
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

### 步驟 4：效能索引

```sql
-- 為頻繁查詢的列創建索引
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_supplier ON products(supplier_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- 為常見查詢模式創建複合索引
CREATE INDEX idx_products_category_active ON products(category_id, is_active);
CREATE INDEX idx_orders_customer_status ON orders(customer_id, order_status);
```

## 高級設計模式

### 1. 審計跟蹤模式

跟蹤重要資料的更改：

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

### 2. 軟刪除模式

為審計目的保留已刪除的記錄：

```sql
ALTER TABLE products
ADD COLUMN deleted_at TIMESTAMP NULL,
ADD COLUMN deleted_by INT NULL;

-- 查詢活躍產品
SELECT * FROM products WHERE deleted_at IS NULL;

-- 軟刪除產品
UPDATE products
SET deleted_at = CURRENT_TIMESTAMP, deleted_by = 1
WHERE product_id = 123;
```

### 3. 版本控制模式

跟蹤記錄的不同版本：

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

## 應避免的常見設計錯誤

### 1. 使用通用列名

```sql
-- 壞
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

### 2. 在一列中存儲多個值

```sql
-- 壞
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

### 3. 不使用外鍵

```sql
-- 壞：沒有引用完整性
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT  -- 沒有外鍵約束
);

-- 好：強制引用完整性
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
```

### 4. 過度規範化

有時為了效能，反規範化是可以接受的：

```sql
-- 高度規範化（可能對報告較慢）
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- 為效能反規範化（存儲計算值）
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    unit_price DECIMAL(10, 2),    -- 反規範化
    subtotal DECIMAL(12, 2),      -- 計算值
    PRIMARY KEY (order_id, product_id)
);
```

## 資料庫設計最佳實踐

### 1. 使用一致的命名約定

```sql
-- 表名：小寫，複數
CREATE TABLE customers (...);
CREATE TABLE orders (...);
CREATE TABLE order_items (...);

-- 列名：小寫，描述性
customer_id, first_name, created_at, is_active

-- 外鍵：reference_table_id
customer_id, product_id, category_id
```

### 2. 始終使用主鍵

```sql
-- 每個表都應該有主鍵
CREATE TABLE logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. 選擇適當的存儲引擎

```sql
-- InnoDB 用於事務資料（默認）
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    total_amount DECIMAL(10, 2)
) ENGINE=InnoDB;

-- MyISAM 用於讀密集、非事務資料
CREATE TABLE search_logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    search_term VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM;
```

### 4. 為增長做計劃

```sql
-- 為未來增長使用適當的資料類型
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,  -- BIGINT 用於大用戶基數
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 分區大表
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

## 效能考慮

### 1. 索引策略

```sql
-- 為頻繁查詢的列創建索引
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(order_status);

-- 多列查詢的複合索引
CREATE INDEX idx_products_category_active ON products(category_id, is_active);

-- 特定查詢的覆蓋索引
CREATE INDEX idx_orders_covering
ON orders(customer_id, order_date, total_amount);
```

### 2. 查詢優化

```sql
-- 使用適當索引的高效查詢
SELECT o.order_id, o.total_amount, c.first_name, c.last_name
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.order_status = 'pending'
  AND o.order_date >= '2024-01-01'
ORDER BY o.order_date DESC
LIMIT 50;
```

### 3. 歸檔策略

```sql
-- 將舊資料移動到歸檔表
CREATE TABLE orders_archive LIKE orders;

-- 歸檔超過 2 年的訂單
INSERT INTO orders_archive
SELECT * FROM orders
WHERE order_date < DATE_SUB(NOW(), INTERVAL 2 YEAR);

DELETE FROM orders
WHERE order_date < DATE_SUB(NOW(), INTERVAL 2 YEAR);
```

## 結論

良好的資料庫設計對於構建可擴展、可維護的應用程式至關重要。關鍵原則包括：

1. **適當規範化** - 在減少冗餘的同時保持效能
2. **使用有意義的名稱** - 使您的資料庫自文檔化
3. **選擇正確的資料類型** - 優化存儲和效能
4. **實現適當的關係** - 維護資料完整性
5. **為增長做計劃** - 為未來需求設計
6. **策略性索引** - 平衡查詢效能與寫入效能

記住，資料庫設計是迭代的。從堅實的基礎開始，但準備好在應用程式發展時進行重構。定期審查和優化資料庫模式將確保它在應用程式增長時繼續有效地為您的應用程式服務。

## 下一步

掌握資料庫設計原則後，考慮學習：

1. **高級索引策略** - 複合索引、覆蓋索引
2. **資料庫效能調優** - 查詢優化、執行計劃
3. **備份和恢復** - 資料保護策略
4. **複製和擴展** - 高可用性解決方案
5. **資料庫安全** - 用戶管理、訪問控制

通過這些基礎知識，您將具備為任何應用程式設計健壯、高效資料庫的能力！