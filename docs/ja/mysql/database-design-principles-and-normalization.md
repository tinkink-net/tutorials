# データベース設計の原則と正規化

データベース設計は、あらゆる成功するアプリケーションの基盤です。貧弱なデータベース設計は、データの不整合、パフォーマンスの問題、メンテナンスの悪夢を引き起こす可能性があります。このチュートリアルでは、効率的で拡張性があり、保守しやすいデータベースを作成するための基本的なデータベース設計原則と正規化技術について説明します。

## データベース設計とは？

データベース設計は、情報を効率的に保存、取得、管理するためにデータをテーブル、列、関係に整理するプロセスです。良いデータベース設計は以下を保証します：

- **データの整合性** - 正確で一貫性のあるデータ
- **パフォーマンス** - 高速なクエリ実行
- **スケーラビリティ** - 増加するデータ量に対応する能力
- **保守性** - 修正や拡張が容易
- **セキュリティ** - 機密情報の保護

## コアデータベース設計原則

### 1. エンティティと関係の識別

**エンティティ**はドメイン内で保存する必要がある対象や概念です。**関係**はエンティティ同士のつながり方を定義します。

**例：Eコマースシステム**
```
エンティティ：
- 顧客
- 製品
- 注文
- カテゴリ
- サプライヤー

関係：
- 顧客が注文を行う
- 注文に製品が含まれる
- 製品がカテゴリに属する
- サプライヤーが製品を供給する
```

### 2. 適切なデータ型の選択

各列に最も適したデータ型を選択します：

```sql
-- 良い例：適切なデータ型
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT UNSIGNED NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT
);

-- 悪い例：不適切なデータ型
CREATE TABLE products_bad (
    id VARCHAR(50),  -- パフォーマンスのためにINTにすべき
    name TEXT,       -- 短いテキストにはVARCHARの方が効率的
    price FLOAT,     -- 金額にはDECIMALの方が正確
    stock_quantity DECIMAL(10,2), -- 数量にはINTが適切
    is_active VARCHAR(10), -- BOOLEANの方が適切
    created_at VARCHAR(50) -- 日付はTIMESTAMPの方が適切
);
```

### 3. 意味のある名前を使用する

テーブルと列に説明的な名前を選びます：

```sql
-- 良い命名
CREATE TABLE customer_orders (
    order_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    shipping_address VARCHAR(500),
    order_status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled')
);

-- 悪い命名
CREATE TABLE t1 (
    id INT PRIMARY KEY,
    c_id INT,
    dt DATE,
    amt DECIMAL(10, 2),
    addr VARCHAR(500),
    stat VARCHAR(20)
);
```

### 4. 冗長なデータを避ける

同じ情報を複数の場所に保存しないでください：

```sql
-- 良い例：正規化された設計
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

-- 悪い例：注文に冗長な顧客データ
CREATE TABLE orders_bad (
    order_id INT PRIMARY KEY,
    customer_id INT,
    customer_name VARCHAR(100),  -- 冗長
    customer_email VARCHAR(100), -- 冗長
    customer_phone VARCHAR(20),  -- 冗長
    order_date DATE,
    total_amount DECIMAL(10, 2)
);
```

## データベース正規化

正規化は、冗長性を減らしデータの整合性を向上させるためにデータを整理するプロセスです。これには、大きなテーブルを小さな関連テーブルに分割することが含まれます。

### 第一正規形（1NF）

**ルール：**
- 各列は原子的（分割不可能）な値を含む
- 各行は一意である
- 繰り返しグループがない

**例：**

```sql
-- 1NFに違反：1つの列に複数の値
CREATE TABLE employees_bad (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    skills VARCHAR(500) -- "Java, Python, SQL" - 原子的でない
);

-- 1NFに準拠：原子的な値
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

### 第二正規形（2NF）

**ルール：**
- 1NFである必要がある
- 複合主キーに対する部分的依存関係がない

**例：**

```sql
-- 2NFに違反：部分的依存関係
CREATE TABLE order_items_bad (
    order_id INT,
    product_id INT,
    product_name VARCHAR(100),    -- product_idのみに依存
    product_price DECIMAL(10, 2), -- product_idのみに依存
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- 2NFに準拠：部分的依存関係を削除
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

### 第三正規形（3NF）

**ルール：**
- 2NFである必要がある
- 推移的依存関係がない

**例：**

```sql
-- 3NFに違反：推移的依存関係
CREATE TABLE employees_bad (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    department_name VARCHAR(100),    -- department_idに依存
    department_manager VARCHAR(100)  -- department_idに依存
);

-- 3NFに準拠：推移的依存関係を削除
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

### ボイス・コッド正規形（BCNF）

**ルール：**
- 3NFである必要がある
- すべての決定子は候補キーでなければならない

**例：**

```sql
-- BCNFに違反
CREATE TABLE course_instructor_bad (
    course_id INT,
    instructor_id INT,
    instructor_name VARCHAR(100),
    room VARCHAR(50),
    PRIMARY KEY (course_id, instructor_id)
    -- instructor_nameはinstructor_id（候補キーではない）に依存
);

-- BCNFに準拠
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

## 実践的なデータベース設計プロセス

### ステップ1：要件分析

保存する必要があるデータを特定します：

```
Eコマースの要件：
- 顧客情報の追跡
- 製品カタログの管理
- 注文の処理
- 支払いの処理
- 在庫の追跡
- サプライヤーの管理
- レポートの生成
```

### ステップ2：エンティティ関連図（ERD）

データベースの視覚的表現を作成します：

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

### ステップ3：テーブル作成

```sql
-- 顧客テーブル
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

-- カテゴリテーブル
CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_category_id INT,
    FOREIGN KEY (parent_category_id) REFERENCES categories(category_id)
);

-- サプライヤーテーブル
CREATE TABLE suppliers (
    supplier_id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT
);

-- 製品テーブル
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

-- 注文テーブル
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

-- 注文アイテムテーブル（ジャンクションテーブル）
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

### ステップ4：パフォーマンスのためのインデックス

```sql
-- 頻繁に検索される列にインデックスを作成
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_supplier ON products(supplier_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- 一般的なクエリパターン用の複合インデックス
CREATE INDEX idx_products_category_active ON products(category_id, is_active);
CREATE INDEX idx_orders_customer_status ON orders(customer_id, order_status);
```

## 高度な設計パターン

### 1. 監査証跡パターン

重要なデータの変更を追跡します：

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

### 2. ソフトデリートパターン

監査目的で削除されたレコードを保持します：

```sql
ALTER TABLE products
ADD COLUMN deleted_at TIMESTAMP NULL,
ADD COLUMN deleted_by INT NULL;

-- アクティブな製品を検索
SELECT * FROM products WHERE deleted_at IS NULL;

-- 製品をソフトデリート
UPDATE products
SET deleted_at = CURRENT_TIMESTAMP, deleted_by = 1
WHERE product_id = 123;
```

### 3. バージョニングパターン

レコードの異なるバージョンを追跡します：

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

## 避けるべき一般的な設計ミス

### 1. 一般的な列名の使用

```sql
-- 悪い例
CREATE TABLE orders (
    id INT PRIMARY KEY,
    value DECIMAL(10, 2),
    type VARCHAR(20),
    status VARCHAR(20)
);

-- 良い例
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    total_amount DECIMAL(10, 2),
    order_type ENUM('online', 'in-store', 'phone'),
    order_status ENUM('pending', 'processing', 'shipped', 'delivered')
);
```

### 2. 1つの列に複数の値を保存

```sql
-- 悪い例
CREATE TABLE users (
    user_id INT PRIMARY KEY,
    permissions VARCHAR(500) -- "read,write,delete,admin"
);

-- 良い例
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

### 3. 外部キーを使用しない

```sql
-- 悪い例：参照整合性なし
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT  -- 外部キー制約なし
);

-- 良い例：参照整合性を強制
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
```

### 4. 過剰正規化

パフォーマンスのために非正規化が許容される場合もあります：

```sql
-- 高度に正規化（レポート作成には遅い可能性あり）
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- パフォーマンス向上のための非正規化（計算値を保存）
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    unit_price DECIMAL(10, 2),    -- 非正規化
    subtotal DECIMAL(12, 2),      -- 計算値
    PRIMARY KEY (order_id, product_id)
);
```

## データベース設計のベストプラクティス

### 1. 一貫した命名規則を使用する

```sql
-- テーブル名：小文字、複数形
CREATE TABLE customers (...);
CREATE TABLE orders (...);
CREATE TABLE order_items (...);

-- 列名：小文字、説明的
customer_id, first_name, created_at, is_active

-- 外部キー：reference_table_id
customer_id, product_id, category_id
```

### 2. 常に主キーを使用する

```sql
-- すべてのテーブルに主キーを設定すべき
CREATE TABLE logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. 適切なストレージエンジンを選択する

```sql
-- トランザクションデータにはInnoDB（デフォルト）
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    total_amount DECIMAL(10, 2)
) ENGINE=InnoDB;

-- 読み取りが多く、非トランザクションデータにはMyISAM
CREATE TABLE search_logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    search_term VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM;
```

### 4. 成長を見据えた計画

```sql
-- 将来の成長に適したデータ型を使用
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,  -- 大規模ユーザーベース用にBIGINT
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 大きなテーブルをパーティション化
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

## パフォーマンスに関する考慮事項

### 1. インデックス戦略

```sql
-- 頻繁に検索される列にインデックスを作成
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(order_status);

-- 複数列クエリ用の複合インデックス
CREATE INDEX idx_products_category_active ON products(category_id, is_active);

-- 特定のクエリ用のカバリングインデックス
CREATE INDEX idx_orders_covering
ON orders(customer_id, order_date, total_amount);
```

### 2. クエリ最適化

```sql
-- 適切なインデックスを持つ効率的なクエリ
SELECT o.order_id, o.total_amount, c.first_name, c.last_name
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.order_status = 'pending'
  AND o.order_date >= '2024-01-01'
ORDER BY o.order_date DESC
LIMIT 50;
```

### 3. アーカイブ戦略

```sql
-- 古いデータをアーカイブテーブルに移動
CREATE TABLE orders_archive LIKE orders;

-- 2年以上前の注文をアーカイブ
INSERT INTO orders_archive
SELECT * FROM orders
WHERE order_date < DATE_SUB(NOW(), INTERVAL 2 YEAR);

DELETE FROM orders
WHERE order_date < DATE_SUB(NOW(), INTERVAL 2 YEAR);
```

## 結論

良いデータベース設計は、スケーラブルで保守可能なアプリケーションを構築するために不可欠です。主な原則は以下の通りです：

1. **適切に正規化する** - パフォーマンスを維持しながら冗長性を減らす
2. **意味のある名前を使用する** - データベースを自己文書化する
3. **正しいデータ型を選択する** - ストレージとパフォーマンスを最適化する
4. **適切な関係を実装する** - データの整合性を維持する
5. **成長を計画する** - 将来の要件を考慮した設計
6. **戦略的にインデックスを設定する** - クエリパフォーマンスと書き込みパフォーマンスのバランスを取る

データベース設計は反復的なプロセスであることを忘れないでください。堅固な基盤から始め、アプリケーションの進化に合わせてリファクタリングする準備をしておきましょう。データベーススキーマの定期的なレビューと最適化により、アプリケーションの成長に伴って効果的に機能し続けることが保証されます。

## 次のステップ

データベース設計原則をマスターした後、以下について学ぶことを検討してください：

1. **高度なインデックス戦略** - 複合インデックス、カバリングインデックス
2. **データベースパフォーマンスチューニング** - クエリ最適化、実行計画
3. **バックアップと復旧** - データ保護戦略
4. **レプリケーションとスケーリング** - 高可用性ソリューション
5. **データベースセキュリティ** - ユーザー管理、アクセス制御

これらの基礎を身につければ、どんなアプリケーションにも堅牢で効率的なデータベースを設計する準備が整います！