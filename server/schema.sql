-- ============================================================
--  General Store Management System — MySQL Schema
--  Database: general_store_db
-- ============================================================

CREATE DATABASE IF NOT EXISTS general_store_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE general_store_db;

CREATE TABLE IF NOT EXISTS users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  role        ENUM('admin','cashier','staff') DEFAULT 'staff',
  passkey     VARCHAR(10)  DEFAULT NULL,
  post_desc   VARCHAR(200) DEFAULT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS categories (
  id    INT AUTO_INCREMENT PRIMARY KEY,
  name  VARCHAR(80) NOT NULL UNIQUE,
  icon  VARCHAR(50) DEFAULT 'category'
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS suppliers (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(120) NOT NULL,
  contact    VARCHAR(100) DEFAULT NULL,
  phone      VARCHAR(20)  DEFAULT NULL,
  email      VARCHAR(150) DEFAULT NULL,
  address    TEXT         DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS products (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(200) NOT NULL,
  sku          VARCHAR(60)  NOT NULL UNIQUE,
  category_id  INT          NOT NULL,
  supplier_id  INT          DEFAULT NULL,
  qty          INT          NOT NULL DEFAULT 0,
  reorder_lvl  INT          NOT NULL DEFAULT 10,
  cost_price   DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  sell_price   DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  unit         VARCHAR(30)  DEFAULT 'pcs',
  location     VARCHAR(100) DEFAULT NULL,
  image_url    VARCHAR(500) DEFAULT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sales (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  bill_no       VARCHAR(30) NOT NULL UNIQUE,
  customer_name VARCHAR(150) DEFAULT 'Walk-in Customer',
  cashier_id    INT          DEFAULT NULL,
  total_amount  DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  discount      DECIMAL(10,2) DEFAULT 0.00,
  payment_mode  ENUM('cash','card','upi') DEFAULT 'cash',
  sale_date     DATE         NOT NULL,
  created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cashier_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sale_items (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  sale_id     INT            NOT NULL,
  product_id  INT            NOT NULL,
  qty         INT            NOT NULL DEFAULT 1,
  unit_price  DECIMAL(10,2) NOT NULL,
  subtotal    DECIMAL(12,2) GENERATED ALWAYS AS (qty * unit_price) STORED,
  FOREIGN KEY (sale_id)    REFERENCES sales(id)    ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS purchases (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  po_no          VARCHAR(30)  NOT NULL UNIQUE,
  supplier_id    INT          DEFAULT NULL,
  total_cost     DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  purchase_date  DATE         NOT NULL,
  created_by     INT          DEFAULT NULL,
  created_at     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by)  REFERENCES users(id)     ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS purchase_items (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  purchase_id  INT            NOT NULL,
  product_id   INT            NOT NULL,
  qty          INT            NOT NULL DEFAULT 1,
  unit_cost    DECIMAL(10,2) NOT NULL,
  subtotal     DECIMAL(12,2) GENERATED ALWAYS AS (qty * unit_cost) STORED,
  FOREIGN KEY (purchase_id) REFERENCES purchases(id)  ON DELETE CASCADE,
  FOREIGN KEY (product_id)  REFERENCES products(id)   ON DELETE RESTRICT
) ENGINE=InnoDB;
