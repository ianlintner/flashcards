import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "SQL Fundamentals",
    front:
      "What is the SQL query execution\norder?\n\nHow does it differ from\nthe written order?",
    back: "Written order:\n  SELECT -> FROM -> WHERE -> GROUP BY\n  -> HAVING -> ORDER BY -> LIMIT\n\nExecution order (logical):\n  1. FROM / JOINs: Identify tables.\n  2. WHERE: Filter rows.\n  3. GROUP BY: Create groups.\n  4. HAVING: Filter groups.\n  5. SELECT: Choose columns, expressions.\n  6. DISTINCT: Remove duplicates.\n  7. ORDER BY: Sort results.\n  8. LIMIT / OFFSET: Paginate.\n\nWhy it matters:\n  - Can't use SELECT alias in WHERE.\n    WHERE total > 100  -- Error!\n    (Use HAVING or subquery.)\n  - Can use alias in ORDER BY.\n  - WHERE filters BEFORE grouping.\n  - HAVING filters AFTER grouping.\n\nExample:\n  SELECT dept, COUNT(*) as cnt\n  FROM employees\n  WHERE salary > 50000\n  GROUP BY dept\n  HAVING COUNT(*) > 5\n  ORDER BY cnt DESC\n  LIMIT 10;\n\n  Execution:\n  1. FROM employees.\n  2. WHERE salary > 50000.\n  3. GROUP BY dept.\n  4. HAVING COUNT(*) > 5.\n  5. SELECT dept, COUNT(*).\n  6. ORDER BY cnt DESC.\n  7. LIMIT 10.",
  },
  {
    topic: "JOIN Types",
    front:
      "Explain INNER JOIN, LEFT JOIN,\nRIGHT JOIN, FULL OUTER JOIN,\nand CROSS JOIN.",
    back: "INNER JOIN:\n  Only matching rows from both tables.\n  SELECT * FROM A\n  INNER JOIN B ON A.id = B.a_id;\n  Most common. Default JOIN type.\n\nLEFT (OUTER) JOIN:\n  All rows from left + matches from right.\n  Non-matching right side = NULL.\n  SELECT * FROM A\n  LEFT JOIN B ON A.id = B.a_id;\n  Use: Include all A even without B.\n\nRIGHT (OUTER) JOIN:\n  All rows from right + matches from left.\n  Rarely used (just swap table order\n  and use LEFT JOIN).\n\nFULL OUTER JOIN:\n  All rows from both tables.\n  NULLs where no match on either side.\n  Not supported in MySQL (use UNION\n  of LEFT + RIGHT).\n\nCROSS JOIN:\n  Cartesian product: Every A with every B.\n  m rows x n rows = m*n rows.\n  SELECT * FROM A CROSS JOIN B;\n  Use: Generate combinations (sizes x colors).\n\nSELF JOIN:\n  Table joined to itself.\n  SELECT e.name, m.name AS manager\n  FROM employees e\n  JOIN employees m ON e.mgr_id = m.id;\n\nAnti-join pattern:\n  LEFT JOIN ... WHERE B.id IS NULL.\n  Find A rows with no matching B.\n  Alternative: NOT EXISTS, NOT IN.",
  },
  {
    topic: "Window Functions",
    front:
      "What are SQL window functions?\n\nExplain ROW_NUMBER, RANK,\nand aggregate windows.",
    back: "Window functions: Compute values\nacross a set of rows related to\ncurrent row. Don't collapse rows.\n\nSyntax:\n  func() OVER (\n    PARTITION BY col\n    ORDER BY col\n    ROWS BETWEEN ... AND ...\n  )\n\nRanking functions:\n  ROW_NUMBER(): 1,2,3,4 (always unique).\n  RANK(): 1,2,2,4 (gaps after ties).\n  DENSE_RANK(): 1,2,2,3 (no gaps).\n  NTILE(n): Split into n equal buckets.\n\nExample - top 3 per department:\n  SELECT * FROM (\n    SELECT *, ROW_NUMBER() OVER (\n      PARTITION BY dept\n      ORDER BY salary DESC\n    ) AS rn\n    FROM employees\n  ) t WHERE rn <= 3;\n\nAggregate windows:\n  SUM(sal) OVER (PARTITION BY dept)\n  AVG(sal) OVER (ORDER BY hire_date\n    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)\n  Running total, moving average.\n\nOffset functions:\n  LAG(col, n): Value n rows before.\n  LEAD(col, n): Value n rows after.\n  FIRST_VALUE(col): First in window.\n  LAST_VALUE(col): Last in window.\n\nFrame clauses:\n  ROWS BETWEEN UNBOUNDED PRECEDING\n    AND CURRENT ROW (running total).\n  RANGE: Based on value, not position.",
  },
  {
    topic: "Indexing",
    front: "How do database indexes work?\n\nB-tree vs hash vs GIN vs GiST.",
    back: "Index: Data structure for fast lookup.\n  Without index: Full table scan O(n).\n  With index: O(log n) typically.\n\nB-tree (default, most common):\n  Balanced tree, sorted keys.\n  Good for: =, <, >, <=, >=, BETWEEN,\n    LIKE 'prefix%', ORDER BY.\n  Multi-column: Left-to-right prefix.\n    (a, b, c): Can use (a), (a,b),\n    (a,b,c). NOT (b) or (c) alone.\n\nHash index:\n  O(1) for = lookups only.\n  No range queries, no ordering.\n  Rarely used explicitly.\n\nGIN (Generalized Inverted Index):\n  For composite types: arrays, JSON,\n  full-text search (tsvector).\n  Maps values -> rows containing them.\n\nGiST (Generalized Search Tree):\n  Geometric/spatial data.\n  Range types, PostGIS.\n  R-tree internally.\n\nCovering index (INCLUDE):\n  CREATE INDEX idx ON t(a) INCLUDE (b,c);\n  Index-only scan: No table lookup needed.\n\nPartial index:\n  CREATE INDEX idx ON t(email)\n  WHERE active = true;\n  Smaller, faster for filtered queries.\n\nKey rules:\n  Index columns in WHERE and JOIN.\n  Don't over-index (write overhead).\n  EXPLAIN ANALYZE to check usage.\n  Composite index order matters.\n  Functions on columns prevent index use:\n    WHERE LOWER(name) = 'x'  -- No index!\n    Use: Expression index or generated col.",
  },
  {
    topic: "Query Optimization",
    front:
      "How do you optimize slow\nSQL queries?\n\nKey EXPLAIN ANALYZE concepts.",
    back: "EXPLAIN ANALYZE:\n  Shows actual execution plan + timing.\n  Key metrics:\n    Seq Scan: Full table scan (bad if large).\n    Index Scan: Using index (good).\n    Nested Loop: Small datasets.\n    Hash Join: Large datasets, equality.\n    Merge Join: Pre-sorted data.\n    Sort: ORDER BY cost.\n    Rows: Estimated vs actual (check!).\n\nCommon optimizations:\n\n  Add missing indexes:\n    Check WHERE, JOIN, ORDER BY columns.\n\n  Avoid SELECT *:\n    Only select needed columns.\n    Enables covering index scan.\n\n  Avoid functions on indexed columns:\n    Bad: WHERE YEAR(created) = 2024.\n    Good: WHERE created >= '2024-01-01'\n          AND created < '2025-01-01'.\n\n  Avoid N+1 queries:\n    Don't loop queries. Use JOINs or\n    batch IN (id1, id2, ...).\n\n  Pagination:\n    OFFSET is slow for large values.\n    Use keyset pagination:\n    WHERE id > last_seen_id LIMIT 20.\n\n  Subquery vs JOIN:\n    EXISTS often faster than IN.\n    WITH (CTE) for readability.\n    Materialized CTE (Postgres 12+).\n\n  Denormalization:\n    Pre-compute aggregates.\n    Materialized views for reports.\n    Trade storage for read speed.",
  },
  {
    topic: "Transactions & ACID",
    front:
      "What are ACID properties?\n\nExplain isolation levels\nand their trade-offs.",
    back: "ACID:\n  Atomicity: All or nothing.\n    BEGIN; UPDATE...; INSERT...; COMMIT;\n    If error: ROLLBACK restores state.\n\n  Consistency: Data satisfies constraints\n    before and after transaction.\n    Foreign keys, unique, check constraints.\n\n  Isolation: Concurrent transactions\n    don't interfere with each other.\n\n  Durability: Committed data survives\n    crashes. WAL (Write-Ahead Log).\n\nIsolation levels (weakest to strongest):\n\n  READ UNCOMMITTED:\n    Can see uncommitted changes (dirty read).\n    Rarely used.\n\n  READ COMMITTED (Postgres default):\n    Only see committed data.\n    Non-repeatable reads possible.\n\n  REPEATABLE READ (MySQL default):\n    Same query returns same rows.\n    Phantom reads possible (new rows).\n\n  SERIALIZABLE:\n    Full isolation. As if serial execution.\n    Slowest. May abort transactions.\n\nConcurrency problems:\n  Dirty read: See uncommitted.\n  Non-repeatable read: Row changed between\n    reads in same transaction.\n  Phantom read: New rows appear between\n    reads in same transaction.\n  Lost update: Two writes, one overwritten.\n\nMVCC (Multi-Version Concurrency Control):\n  Each transaction sees a snapshot.\n  Readers don't block writers.\n  Used by Postgres, MySQL InnoDB, Oracle.",
  },
  {
    topic: "Normal Forms",
    front: "What are database normal forms?\n\nExplain 1NF through BCNF.",
    back: "Normalization: Organize tables to\nreduce redundancy and anomalies.\n\n1NF (First Normal Form):\n  - Each column has atomic values.\n  - No repeating groups or arrays.\n  Bad: skills = 'Python,Java,Go'.\n  Good: Separate skills table.\n\n2NF (Second Normal Form):\n  - 1NF + no partial dependencies.\n  - Every non-key column depends on\n    the ENTIRE primary key.\n  Bad: (student_id, course_id) -> student_name.\n    student_name depends only on student_id.\n  Fix: Separate students table.\n\n3NF (Third Normal Form):\n  - 2NF + no transitive dependencies.\n  - Non-key cols depend ONLY on the key.\n  Bad: employee -> dept_id -> dept_name.\n    dept_name depends on dept_id, not employee.\n  Fix: Separate departments table.\n\nBCNF (Boyce-Codd Normal Form):\n  - 3NF + every determinant is a\n    candidate key.\n  - Stricter version of 3NF.\n  Rare difference in practice.\n\nDenormalization (intentional!):\n  Add redundancy for read performance.\n  Pre-join tables for common queries.\n  Use in OLAP/data warehouses.\n  Star schema: Fact + dimension tables.\n  Snowflake: Normalized dimensions.\n\nGuideline:\n  OLTP: Normalize (3NF).\n  OLAP/Analytics: Denormalize.\n  NoSQL: Denormalize by access pattern.",
  },
  {
    topic: "Advanced SQL Patterns",
    front: "What are CTEs, recursive\nqueries, and pivot tables\nin SQL?",
    back: "CTE (Common Table Expression):\n  WITH cte AS (\n    SELECT dept, AVG(salary) as avg_sal\n    FROM employees\n    GROUP BY dept\n  )\n  SELECT * FROM cte WHERE avg_sal > 80000;\n  Readable, reusable within query.\n  Some DBs materialize CTEs.\n\nRecursive CTE:\n  WITH RECURSIVE tree AS (\n    -- Base case\n    SELECT id, name, parent_id, 0 as depth\n    FROM categories WHERE parent_id IS NULL\n    UNION ALL\n    -- Recursive case\n    SELECT c.id, c.name, c.parent_id, t.depth+1\n    FROM categories c\n    JOIN tree t ON c.parent_id = t.id\n  )\n  SELECT * FROM tree;\n  Use: Hierarchies, graphs, bill of materials.\n\nPivot (cross-tab):\n  SELECT name,\n    SUM(CASE WHEN month='Jan' THEN sales END)\n      as jan,\n    SUM(CASE WHEN month='Feb' THEN sales END)\n      as feb\n  FROM monthly_sales\n  GROUP BY name;\n  Turn rows into columns.\n  SQL Server: PIVOT keyword.\n\nUPSERT:\n  INSERT ... ON CONFLICT DO UPDATE (Postgres).\n  INSERT ... ON DUPLICATE KEY UPDATE (MySQL).\n  MERGE (SQL Server, Oracle).\n\nJSON in SQL:\n  Postgres: jsonb, ->, ->>, @>.\n  MySQL: JSON_EXTRACT, JSON_TABLE.\n  Good for semi-structured data.\n  Index with GIN (Postgres).",
  },
];

export const SQL_MASTERY: DeckInfo = {
  id: "sql-mastery",
  title: "SQL Mastery",
  description:
    "Query execution, JOINs, window functions, indexing, optimization, transactions, normalization, and advanced patterns.",
  category: "Languages",
  level: "intermediate",
  cards,
  tags: [
    "SQL",
    "database",
    "joins",
    "indexing",
    "transactions",
    "optimization",
  ],
  estimatedMinutes: 12,
};
