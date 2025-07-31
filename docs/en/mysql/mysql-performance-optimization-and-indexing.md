# MySQL Performance Optimization and Indexing

MySQL performance optimization is crucial for applications that handle large amounts of data and require fast query responses. This tutorial covers comprehensive strategies for optimizing MySQL performance, with a focus on indexing, query optimization, and database tuning.

## Understanding MySQL Performance

### What Affects MySQL Performance?

1. **Database Schema Design** - Table structure and relationships
2. **Indexing Strategy** - How data is indexed for quick retrieval
3. **Query Structure** - How queries are written and executed
4. **Server Configuration** - MySQL server settings and resources
5. **Hardware Resources** - CPU, RAM, storage, and network
6. **Application Design** - How applications interact with the database

### Performance Metrics to Monitor

- **Query Response Time** - How long queries take to execute
- **Throughput** - Number of queries processed per second
- **CPU Usage** - Processor utilization
- **Memory Usage** - RAM consumption
- **Disk I/O** - Read/write operations
- **Connection Count** - Active database connections

## MySQL Indexing Deep Dive

### What are Indexes?

**Indexes** are data structures that improve the speed of data retrieval operations on a database table. They create shortcuts to data, similar to an index in a book.

### Types of Indexes

#### 1. Primary Index (Clustered)

```sql
-- Primary key automatically creates a clustered index
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- The primary key index is automatically created
SHOW INDEX FROM users;
```

#### 2. Secondary Index (Non-Clustered)

```sql
-- Create secondary indexes for frequently queried columns
CREATE INDEX idx_username ON users(username);
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_created_at ON users(created_at);

-- View all indexes
SHOW INDEX FROM users;
```

#### 3. Composite Index

```sql
-- Index on multiple columns
CREATE INDEX idx_status_created ON users(status, created_at);
CREATE INDEX idx_name_email ON users(first_name, last_name, email);

-- Order matters in composite indexes
-- This index helps queries filtering by:
-- 1. status only
-- 2. status and created_at
-- But NOT created_at only
```

#### 4. Unique Index

```sql
-- Ensure uniqueness and improve performance
CREATE UNIQUE INDEX idx_unique_email ON users(email);
CREATE UNIQUE INDEX idx_unique_username ON users(username);

-- Composite unique index
CREATE UNIQUE INDEX idx_unique_user_project ON user_projects(user_id, project_id);
```

#### 5. Partial Index

```sql
-- Index only specific rows (MySQL 8.0+)
CREATE INDEX idx_active_users ON users(username) WHERE status = 'active';

-- For older MySQL versions, use functional approach
CREATE INDEX idx_active_users ON users(status, username);
```

#### 6. Full-Text Index

```sql
-- For text search capabilities
CREATE TABLE articles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    content TEXT,
    FULLTEXT(title, content)
);

-- Or add to existing table
ALTER TABLE articles ADD FULLTEXT(title, content);

-- Using full-text search
SELECT * FROM articles
WHERE MATCH(title, content) AGAINST('database optimization');
```

### Index Best Practices

#### 1. Choose the Right Columns to Index

```sql
-- ✅ Good candidates for indexing:
-- Frequently used in WHERE clauses
CREATE INDEX idx_order_status ON orders(status);

-- Used in JOIN conditions
CREATE INDEX idx_order_user_id ON orders(user_id);

-- Used in ORDER BY clauses
CREATE INDEX idx_product_price ON products(price);

-- Used in GROUP BY clauses
CREATE INDEX idx_order_date ON orders(DATE(created_at));
```

#### 2. Avoid Over-Indexing

```sql
-- ❌ Bad: Too many indexes on one table
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10,2),
    category_id INT,
    created_at TIMESTAMP
);

-- Don't create indexes on every column
CREATE INDEX idx_name ON products(name);
CREATE INDEX idx_price ON products(price);
CREATE INDEX idx_category ON products(category_id);
CREATE INDEX idx_created ON products(created_at);
-- This slows down INSERT/UPDATE/DELETE operations

-- ✅ Good: Strategic indexing
CREATE INDEX idx_category_price ON products(category_id, price);
CREATE INDEX idx_name ON products(name);
-- Covers most query patterns with fewer indexes
```

#### 3. Index Column Order in Composite Indexes

```sql
-- Rule: Most selective column first
CREATE INDEX idx_status_date ON orders(status, order_date);

-- This index helps these queries:
SELECT * FROM orders WHERE status = 'pending';
SELECT * FROM orders WHERE status = 'pending' AND order_date > '2023-01-01';

-- But not this one efficiently:
SELECT * FROM orders WHERE order_date > '2023-01-01';
-- For this, you'd need: CREATE INDEX idx_date ON orders(order_date);
```

## Query Optimization Techniques

### 1. Use EXPLAIN to Analyze Queries

```sql
-- Basic EXPLAIN
EXPLAIN SELECT * FROM users WHERE email = 'john@example.com';

-- More detailed analysis
EXPLAIN FORMAT=JSON SELECT * FROM users WHERE email = 'john@example.com';

-- Analyze actual execution
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'john@example.com';
```

### 2. Optimize WHERE Clauses

```sql
-- ✅ Good: Use indexed columns
SELECT * FROM users WHERE user_id = 123;

-- ❌ Bad: Functions in WHERE clause prevent index usage
SELECT * FROM users WHERE UPPER(username) = 'JOHN';

-- ✅ Good: Store data in the format you'll query
SELECT * FROM users WHERE username = 'john';

-- ❌ Bad: Leading wildcard prevents index usage
SELECT * FROM users WHERE username LIKE '%john%';

-- ✅ Good: Prefix search can use index
SELECT * FROM users WHERE username LIKE 'john%';
```

### 3. Optimize JOINs

```sql
-- ✅ Good: Proper indexes on JOIN columns
SELECT u.username, p.title
FROM users u
JOIN posts p ON u.id = p.user_id  -- Index on user_id
WHERE u.status = 'active';        -- Index on status

-- ✅ Good: Use appropriate JOIN types
SELECT u.username, p.title
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE u.id = 123;

-- ❌ Bad: Cartesian product
SELECT * FROM users, posts WHERE users.id = posts.user_id;

-- ✅ Good: Use explicit JOIN syntax
SELECT * FROM users
JOIN posts ON users.id = posts.user_id;
```

### 4. Optimize LIMIT and OFFSET

```sql
-- ❌ Bad: Large OFFSET is slow
SELECT * FROM users ORDER BY created_at LIMIT 10000, 10;

-- ✅ Good: Use cursor-based pagination
SELECT * FROM users
WHERE created_at > '2023-01-01 10:30:00'
ORDER BY created_at
LIMIT 10;

-- ✅ Good: Use ID-based pagination
SELECT * FROM users
WHERE id > 10000
ORDER BY id
LIMIT 10;
```

### 5. Optimize GROUP BY and ORDER BY

```sql
-- ✅ Good: Index supports GROUP BY
CREATE INDEX idx_category_created ON products(category_id, created_at);

SELECT category_id, COUNT(*)
FROM products
GROUP BY category_id;

-- ✅ Good: Index supports ORDER BY
SELECT * FROM products
ORDER BY category_id, price;

-- ❌ Bad: ORDER BY with different directions without proper index
SELECT * FROM products
ORDER BY category_id ASC, price DESC;

-- ✅ Good: Create index for mixed sorting
CREATE INDEX idx_category_price_desc ON products(category_id, price DESC);
```

## Advanced Query Optimization

### 1. Query Rewriting

```sql
-- Original slow query
SELECT * FROM orders o
WHERE EXISTS (
    SELECT 1 FROM order_items oi
    WHERE oi.order_id = o.id
    AND oi.product_id = 123
);

-- Optimized with JOIN
SELECT DISTINCT o.* FROM orders o
JOIN order_items oi ON o.id = oi.order_id
WHERE oi.product_id = 123;

-- Or with IN (sometimes faster)
SELECT * FROM orders
WHERE id IN (
    SELECT order_id FROM order_items
    WHERE product_id = 123
);
```

### 2. Subquery Optimization

```sql
-- ❌ Bad: Correlated subquery
SELECT * FROM users u
WHERE (
    SELECT COUNT(*) FROM orders o
    WHERE o.user_id = u.id
) > 5;

-- ✅ Good: JOIN with aggregation
SELECT u.* FROM users u
JOIN (
    SELECT user_id, COUNT(*) as order_count
    FROM orders
    GROUP BY user_id
    HAVING COUNT(*) > 5
) o ON u.id = o.user_id;
```

### 3. Using Covering Indexes

```sql
-- Create covering index that includes all needed columns
CREATE INDEX idx_covering ON orders(user_id, status, order_date, total_amount);

-- Query can be satisfied entirely from the index
SELECT status, order_date, total_amount
FROM orders
WHERE user_id = 123;
```

### 4. Partitioning for Performance

```sql
-- Range partitioning by date
CREATE TABLE orders (
    id INT AUTO_INCREMENT,
    user_id INT,
    order_date DATE,
    total DECIMAL(10,2),
    PRIMARY KEY (id, order_date)
)
PARTITION BY RANGE (YEAR(order_date)) (
    PARTITION p2022 VALUES LESS THAN (2023),
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- Hash partitioning for even distribution
CREATE TABLE user_activities (
    id INT AUTO_INCREMENT,
    user_id INT,
    activity_type VARCHAR(50),
    created_at TIMESTAMP,
    PRIMARY KEY (id, user_id)
)
PARTITION BY HASH(user_id) PARTITIONS 4;
```

## Database Configuration Optimization

### 1. MySQL Configuration Variables

```sql
-- View current configuration
SHOW VARIABLES LIKE 'innodb_buffer_pool_size';
SHOW VARIABLES LIKE 'key_buffer_size';
SHOW VARIABLES LIKE 'query_cache_size';

-- Important settings to optimize:
-- InnoDB Buffer Pool Size (most important)
SET GLOBAL innodb_buffer_pool_size = 2147483648; -- 2GB

-- Query Cache (deprecated in MySQL 8.0)
SET GLOBAL query_cache_size = 268435456; -- 256MB
SET GLOBAL query_cache_type = ON;

-- Thread settings
SET GLOBAL max_connections = 200;
SET GLOBAL thread_cache_size = 16;
```

### 2. InnoDB Configuration

```sql
-- Buffer pool settings
SET GLOBAL innodb_buffer_pool_size = '70%_of_RAM';
SET GLOBAL innodb_buffer_pool_instances = 8;

-- Log settings
SET GLOBAL innodb_log_file_size = 268435456; -- 256MB
SET GLOBAL innodb_log_buffer_size = 16777216; -- 16MB

-- I/O settings
SET GLOBAL innodb_flush_log_at_trx_commit = 2;
SET GLOBAL innodb_flush_method = 'O_DIRECT';
```

### 3. Monitoring and Profiling

```sql
-- Enable slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;
SET GLOBAL log_queries_not_using_indexes = 'ON';

-- Performance Schema
SELECT * FROM performance_schema.events_statements_summary_by_digest
ORDER BY avg_timer_wait DESC LIMIT 10;

-- Information Schema
SELECT * FROM information_schema.innodb_buffer_pool_stats;
```

## Practical Optimization Examples

### 1. E-commerce Product Search

```sql
-- Product table structure
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10,2),
    category_id INT,
    brand_id INT,
    stock_quantity INT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Optimal indexes for search functionality
CREATE INDEX idx_category_status_price ON products(category_id, status, price);
CREATE INDEX idx_brand_status ON products(brand_id, status);
CREATE INDEX idx_status_stock ON products(status, stock_quantity);
CREATE FULLTEXT INDEX idx_fulltext_name_desc ON products(name, description);

-- Optimized search query
SELECT id, name, price
FROM products
WHERE category_id = 1
  AND status = 'active'
  AND stock_quantity > 0
  AND price BETWEEN 10.00 AND 100.00
ORDER BY price ASC
LIMIT 20;
```

### 2. User Activity Tracking

```sql
-- Activity table with partitioning
CREATE TABLE user_activities (
    id BIGINT AUTO_INCREMENT,
    user_id INT,
    activity_type VARCHAR(50),
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id, created_at),
    KEY idx_user_type_date (user_id, activity_type, created_at)
)
PARTITION BY RANGE (UNIX_TIMESTAMP(created_at)) (
    PARTITION p202301 VALUES LESS THAN (UNIX_TIMESTAMP('2023-02-01')),
    PARTITION p202302 VALUES LESS THAN (UNIX_TIMESTAMP('2023-03-01')),
    PARTITION p202303 VALUES LESS THAN (UNIX_TIMESTAMP('2023-04-01')),
    -- Add more partitions as needed
    PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- Efficient query for recent user activity
SELECT activity_type, COUNT(*) as count
FROM user_activities
WHERE user_id = 123
  AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY activity_type
ORDER BY count DESC;
```

### 3. Social Media Feed Optimization

```sql
-- Posts table
CREATE TABLE posts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    status ENUM('active', 'deleted') DEFAULT 'active'
);

-- Optimized indexes for feed generation
CREATE INDEX idx_user_status_created ON posts(user_id, status, created_at);
CREATE INDEX idx_status_created_likes ON posts(status, created_at, likes_count);

-- Followers table
CREATE TABLE followers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    follower_id INT,
    following_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_follow (follower_id, following_id),
    KEY idx_follower (follower_id),
    KEY idx_following (following_id)
);

-- Optimized feed query
SELECT p.id, p.content, p.created_at, p.likes_count
FROM posts p
JOIN followers f ON p.user_id = f.following_id
WHERE f.follower_id = 123
  AND p.status = 'active'
  AND p.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
ORDER BY p.created_at DESC
LIMIT 50;
```

## Performance Monitoring Tools

### 1. MySQL Built-in Tools

```sql
-- Show processlist
SHOW PROCESSLIST;

-- Show engine status
SHOW ENGINE INNODB STATUS;

-- Performance schema queries
SELECT * FROM performance_schema.events_statements_summary_by_digest
WHERE digest_text LIKE '%SELECT%'
ORDER BY avg_timer_wait DESC LIMIT 10;

-- Check table sizes
SELECT
    table_name,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)'
FROM information_schema.tables
WHERE table_schema = 'your_database_name'
ORDER BY (data_length + index_length) DESC;
```

### 2. External Monitoring Tools

```bash
# MySQL Tuner
wget http://mysqltuner.pl/ -O mysqltuner.pl
perl mysqltuner.pl

# Percona Toolkit
pt-query-digest /var/log/mysql/slow.log

# MySQLReport
./mysqlreport --user root --password your_password
```

### 3. Application-Level Monitoring

```python
# Python example with timing
import time
import mysql.connector

def execute_query_with_timing(query):
    start_time = time.time()

    connection = mysql.connector.connect(
        host='localhost',
        database='your_db',
        user='your_user',
        password='your_password'
    )

    cursor = connection.cursor()
    cursor.execute(query)
    results = cursor.fetchall()

    end_time = time.time()
    execution_time = end_time - start_time

    print(f"Query executed in {execution_time:.4f} seconds")

    cursor.close()
    connection.close()

    return results

# Usage
results = execute_query_with_timing("SELECT * FROM users WHERE id = 123")
```

## Common Performance Anti-Patterns

### 1. N+1 Query Problem

```sql
-- ❌ Bad: N+1 queries
-- Application code that runs one query to get posts
SELECT id, title, user_id FROM posts LIMIT 10;

-- Then for each post, another query to get user info
SELECT name FROM users WHERE id = 1;
SELECT name FROM users WHERE id = 2;
-- ... 10 more queries

-- ✅ Good: Single JOIN query
SELECT p.id, p.title, u.name
FROM posts p
JOIN users u ON p.user_id = u.id
LIMIT 10;
```

### 2. SELECT * Usage

```sql
-- ❌ Bad: Selecting all columns
SELECT * FROM users WHERE id = 123;

-- ✅ Good: Select only needed columns
SELECT id, username, email FROM users WHERE id = 123;

-- ✅ Good: Create covering index
CREATE INDEX idx_user_info ON users(id, username, email);
```

### 3. Inefficient Pagination

```sql
-- ❌ Bad: Large OFFSET
SELECT * FROM posts ORDER BY created_at DESC LIMIT 10000, 20;

-- ✅ Good: Cursor-based pagination
SELECT * FROM posts
WHERE created_at < '2023-01-01 12:00:00'
ORDER BY created_at DESC
LIMIT 20;
```

## Scaling Strategies

### 1. Read Replicas

```sql
-- Configure read/write splitting
-- Master for writes
INSERT INTO users (username, email) VALUES ('john', 'john@example.com');
UPDATE users SET email = 'newemail@example.com' WHERE id = 123;

-- Replica for reads
SELECT * FROM users WHERE username = 'john';
SELECT COUNT(*) FROM posts WHERE created_at >= '2023-01-01';
```

### 2. Database Sharding

```sql
-- Shard users by ID ranges
-- Shard 1: users with id 1-1000000
-- Shard 2: users with id 1000001-2000000
-- Shard 3: users with id 2000001-3000000

-- Application logic determines which shard to query
def get_shard_for_user(user_id):
    if user_id <= 1000000:
        return 'shard1'
    elif user_id <= 2000000:
        return 'shard2'
    else:
        return 'shard3'
```

### 3. Caching Strategies

```sql
-- Cache frequently accessed data
-- Application caches user profile for 1 hour
SELECT id, username, email, profile_image
FROM users
WHERE id = 123;

-- Cache aggregated data
SELECT category_id, COUNT(*) as product_count
FROM products
WHERE status = 'active'
GROUP BY category_id;
```

## Maintenance and Optimization Tasks

### 1. Regular Index Maintenance

```sql
-- Check index usage
SELECT
    TABLE_NAME,
    INDEX_NAME,
    CARDINALITY
FROM information_schema.statistics
WHERE TABLE_SCHEMA = 'your_database'
ORDER BY CARDINALITY DESC;

-- Remove unused indexes
-- First, monitor queries to identify unused indexes
DROP INDEX idx_unused_column ON table_name;

-- Rebuild indexes periodically
ALTER TABLE table_name ENGINE=InnoDB;
```

### 2. Table Optimization

```sql
-- Analyze table statistics
ANALYZE TABLE users;

-- Optimize table storage
OPTIMIZE TABLE users;

-- Check table integrity
CHECK TABLE users;
```

### 3. Monitoring Queries

```sql
-- Enable and monitor slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;

-- Review slow query log regularly
-- tail -f /var/log/mysql/slow.log

-- Use pt-query-digest for analysis
-- pt-query-digest /var/log/mysql/slow.log
```

## Best Practices Summary

### 1. Database Design

- **Normalize appropriately** - Avoid over-normalization
- **Use appropriate data types** - Smallest type that fits your data
- **Design for your queries** - Index what you query frequently
- **Consider partitioning** - For very large tables

### 2. Indexing Strategy

- **Index frequently queried columns** - WHERE, JOIN, ORDER BY
- **Use composite indexes wisely** - Most selective column first
- **Avoid over-indexing** - Balance query speed with write performance
- **Monitor index usage** - Remove unused indexes

### 3. Query Optimization

- **Use EXPLAIN** - Always analyze query execution plans
- **Avoid SELECT *** - Query only needed columns
- **Optimize JOINs** - Use appropriate JOIN types and indexes
- **Minimize subqueries** - Consider JOINs instead

### 4. Configuration Tuning

- **Set appropriate buffer sizes** - Especially innodb_buffer_pool_size
- **Monitor performance metrics** - CPU, memory, I/O
- **Enable slow query logging** - Identify problematic queries
- **Regular maintenance** - ANALYZE, OPTIMIZE tables

### 5. Application Design

- **Implement connection pooling** - Reuse database connections
- **Use prepared statements** - Prevent SQL injection and improve performance
- **Implement caching** - Reduce database load
- **Consider async operations** - For non-critical operations

## Conclusion

MySQL performance optimization is an ongoing process that requires attention to database design, indexing strategy, query optimization, and system configuration. Key takeaways:

1. **Start with proper database design** - Good schema design prevents many performance issues
2. **Index strategically** - Create indexes that support your most common queries
3. **Monitor and analyze** - Use tools to identify bottlenecks and slow queries
4. **Test and measure** - Always verify that optimizations actually improve performance
5. **Consider the full stack** - Database performance affects overall application performance

Remember that premature optimization can be counterproductive. Focus on identifying actual bottlenecks through monitoring and measurement, then apply targeted optimizations based on your specific use case and query patterns.

## Next Steps

After mastering MySQL performance optimization, explore:

1. **Advanced replication setups** - Master-slave and master-master replication
2. **MySQL Cluster** - For high availability and scalability
3. **NoSQL alternatives** - When to consider document or key-value stores
4. **Database monitoring tools** - Percona Monitoring and Management, MySQL Enterprise Monitor
5. **Cloud database services** - Amazon RDS, Google Cloud SQL, Azure Database

Performance optimization is crucial for scalable applications - master these techniques to build high-performance database systems!
